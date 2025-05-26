import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { writeFile, unlink } from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import WhyUs from '../../models/whyus.model'

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

// GET all entries
export async function GET() {
    await connectDB()
    try {
        const contents = await WhyUs.find().lean()
        return NextResponse.json(contents)
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}

// POST: Create new entry (handles both JSON and multipart/form-data)
export async function POST(req) {
    await connectDB()
    try {
        const contentType = req.headers.get('content-type')

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData()
            const title = formData.get('title')
            const description = formData.get('description')
            const button = formData.get('button')
            const image = await handleUpload(formData)
            const newContent = await WhyUs.create({
                title,
                description,
                button,
                image: image.length ? image[0] : null,
            })
            return NextResponse.json(newContent, { status: 201 })
        } else {
            const body = await req.json()
            const newContent = await WhyUs.create(body)
            return NextResponse.json(newContent, { status: 201 })
        }
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}

// PATCH: Update entry, including optional image replacement
export async function PATCH(req) {
    await connectDB()
    try {
        const { _id, title, description, image, button } = await req.json()

        const existingContent = await WhyUs.findById(_id)
        if (!existingContent) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 },
            )
        }

        let updatedImage = existingContent.image

        if (image?.url?.startsWith('data:image')) {
            // Delete old image if exists
            if (existingContent.image?.url) {
                const oldPath = path.join(
                    process.cwd(),
                    'public',
                    existingContent.image.url,
                )
                try {
                    await fs.unlink(oldPath)
                } catch {
                    console.warn('Old image not found or already deleted.')
                }
            }

            // Save new image to disk
            const ext = image.name.split('.').pop() || 'png'
            const base64Data = image.url.split(',')[1]
            const buffer = Buffer.from(base64Data, 'base64')
            const filename = `${uuidv4()}.${ext}`
            const filePath = path.join(uploadDir, filename)
            await fs.mkdir(uploadDir, { recursive: true })
            await fs.writeFile(filePath, buffer)

            updatedImage = {
                name: image.name,
                url: `/uploads/${filename}`,
            }
        }

        const updated = await WhyUs.findByIdAndUpdate(
            _id,
            { title, description, image: updatedImage, button },
            { new: true },
        )

        return NextResponse.json(updated, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}

// DELETE: Delete entry and associated image
export async function DELETE(req) {
    await connectDB()
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            )
        }

        const content = await WhyUs.findById(id)
        if (!content) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 },
            )
        }

        if (content.image?.url) {
            const filePath = path.join(
                process.cwd(),
                'public',
                content.image.url,
            )
            try {
                await unlink(filePath)
            } catch {
                console.warn(`Image already deleted or missing: ${filePath}`)
            }
        }

        await WhyUs.findByIdAndDelete(id)

        return NextResponse.json(
            { message: 'Deleted successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error deleting entry:', error)
        return NextResponse.json(
            { message: 'Error deleting item', error: error.message },
            { status: 500 },
        )
    }
}
