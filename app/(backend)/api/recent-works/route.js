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

const handleUpload = async (formData) => {
    const files = formData.getAll('files')
    const uploaded = []

    for (const file of files) {
        if (file && file.name) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const ext = path.extname(file.name)
            const filename = `${uuidv4()}${ext}`
            const filepath = path.join(uploadDir, filename)

            await writeFile(filepath, buffer)
            uploaded.push({ name: file.name, url: `/uploads/${filename}` })
        }
    }
    return uploaded
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
        const contentType = req.headers.get('content-type')

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData()
            const title = formData.get('title')

            if (!title) {
                return NextResponse.json(
                    { error: 'Title is required' },
                    { status: 400 },
                )
            }

            const image = await handleUpload(formData)
            const newWork = await RecentWorks.create({
                title,
                image: image.length ? image[0] : null,
            })

            return NextResponse.json(newWork, { status: 201 })
        } else {
            const body = await req.json()
            if (!body.title) {
                return NextResponse.json(
                    { error: 'Title is required' },
                    { status: 400 },
                )
            }
            const newWork = await RecentWorks.create(body)
            return NextResponse.json(newWork, { status: 201 })
        }
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
        const { _id, title, image } = await req.json()

        if (!_id || !title) {
            return NextResponse.json(
                { error: 'ID and title are required' },
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

        // Handle image update if changed
        let updatedImage = existingWork.image

        if (image?.url?.startsWith('data:image')) {
            // Delete old image if exists
            if (existingWork.image?.url) {
                const oldPath = path.join(
                    process.cwd(),
                    'public',
                    existingWork.image.url.replace('/uploads/', 'uploads/'),
                )
                try {
                    await fs.unlink(oldPath)
                } catch {
                    // silently ignore if old image not found
                }
            }

            // Save new image to disk
            const ext = image.name.split('.').pop()
            if (!ext) {
                return NextResponse.json(
                    { error: 'Invalid image filename' },
                    { status: 400 },
                )
            }

            const base64Data = image.url.split(',')[1]
            const buffer = Buffer.from(base64Data, 'base64')
            const filename = `${uuidv4()}.${ext}`
            await fs.mkdir(uploadDir, { recursive: true })
            const filePath = path.join(uploadDir, filename)
            await fs.writeFile(filePath, buffer)

            updatedImage = {
                name: image.name,
                url: `/uploads/${filename}`,
            }
        }

        const updated = await RecentWorks.findByIdAndUpdate(
            _id,
            { title, image: updatedImage },
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
                recentWork.image.url.replace(/^\//, ''), // ensure no leading slash
            )
            try {
                await unlink(filePath)
            } catch {
                // silently ignore if file missing
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
