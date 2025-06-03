import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { writeFile, unlink } from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import RecentWorks from '../../models/recentworks.model'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')
if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

// Helper to save image from base64
async function saveBase64Image(image) {
    const ext = image.name.split('.').pop()
    if (!ext) throw new Error('Invalid image filename')
    const base64Data = image.url.split(',')[1]
    const buffer = Buffer.from(base64Data, 'base64')
    const filename = `${uuidv4()}.${ext}`
    await fs.mkdir(uploadDir, { recursive: true })
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)
    return {
        name: image.name,
        url: `/uploads/${filename}`,
    }
}

// GET all recent works
export async function GET() {
    try {
        await connectDB()
        const recentWorks = await RecentWorks.find().lean()
        return NextResponse.json(recentWorks)
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}

// POST: Create new recent work
export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()

        const { location, image } = body

        if (!location) {
            return NextResponse.json(
                { error: 'Location is required' },
                { status: 400 },
            )
        }

        let savedImage = null
        if (image && image.url?.startsWith('data:image')) {
            savedImage = await saveBase64Image(image)
        } else if (image && image.url && image.name) {
            // if image is already uploaded url, use as is
            savedImage = image
        }

        const newWork = await RecentWorks.create({
            location,
            image: savedImage,
        })

        return NextResponse.json(newWork, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}

// PATCH: Update recent work entry
export async function PATCH(req) {
    try {
        await connectDB()
        const body = await req.json()
        const { _id, location, image } = body

        if (!_id || !location) {
            return NextResponse.json(
                { error: 'ID and location are required' },
                { status: 400 },
            )
        }

        const existingWork = await RecentWorks.findById(_id)
        if (!existingWork) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 },
            )
        }

        let updatedImage = existingWork.image

        // If new image is a base64 string, save it and delete old one
        if (image?.url?.startsWith('data:image')) {
            if (existingWork.image?.url) {
                const oldPath = path.join(
                    process.cwd(),
                    'public',
                    existingWork.image.url.replace(/^\//, ''),
                )
                try {
                    await unlink(oldPath)
                } catch {
                    // ignore
                }
            }

            updatedImage = await saveBase64Image(image)
        } else if (image && image.url && image.name) {
            // Image unchanged, keep as is
            updatedImage = image
        } else {
            // If no image sent or empty image, set to null
            updatedImage = null
        }

        const updated = await RecentWorks.findByIdAndUpdate(
            _id,
            { location, image: updatedImage },
            { new: true },
        )

        return NextResponse.json(updated, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}

// DELETE: Delete recent work and associated image
export async function DELETE(req) {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            )
        }

        const recentWork = await RecentWorks.findById(id)
        if (!recentWork) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 },
            )
        }

        if (recentWork.image?.url) {
            const filePath = path.join(
                process.cwd(),
                'public',
                recentWork.image.url.replace(/^\//, ''),
            )
            try {
                await unlink(filePath)
            } catch {
                // ignore
            }
        }

        await RecentWorks.findByIdAndDelete(id)

        return NextResponse.json(
            { message: 'Deleted successfully' },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting item', details: error.message },
            { status: 500 },
        )
    }
}
