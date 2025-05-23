import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { writeFile, unlink } from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import BestSeller from '../../models/bestSeller.model'

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

// GET all social media entries
export async function GET() {
    await connectDB()
    const ourProducts = await BestSeller.find().lean()
    return NextResponse.json(ourProducts)
}

// POST: Create new social media
export async function POST(req) {
    await connectDB()
    const contentType = req.headers.get('content-type')

    if (contentType?.includes('multipart/form-data')) {
        const formData = await req.formData()
        const title = formData.get('title')
        const description = formData.get('description')
        const image = await handleUpload(formData)
        const newProduct = await BestSeller.create({
            title,
            description,
            image: image.length ? image[0] : null,
        })
        

        return NextResponse.json(newProduct, { status: 201 })
    } else {
        const body = await req.json()
        const newProduct = await BestSeller.create(body)
        return NextResponse.json(newProduct, { status: 201 })
    }
}

// PATCH: Update social media entry
export async function PATCH(req) {
    await connectDB()
    const { _id, title, description, image } = await req.json()

    const existingProduct = await BestSeller.findById(_id)
    if (!existingProduct) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Handle image update if changed
    let updatedImage = existingProduct.image

    if (image?.url?.startsWith('data:image')) {
        // Delete old image if exists
        if (existingProduct.image?.url) {
            const oldPath = path.join(
                process.cwd(),
                'public',
                existingProduct.image.url.replace('/uploads/', 'uploads/'),
            )
            try {
                await fs.unlink(oldPath)
            } catch (err) {
                console.warn('Old image not found or already deleted.')
            }
        }

        // Save new image to disk
        const ext = image.name.split('.')[1]

        const base64Data = image.url.split(',')[1]
        const buffer = Buffer.from(base64Data, 'base64')
        const filename = `${uuidv4()}.${ext}`
        const uploadDir = path.join(process.cwd(), 'public/uploads')
        await fs.mkdir(uploadDir, { recursive: true })
        const filePath = path.join(uploadDir, filename)
        await fs.writeFile(filePath, buffer)

        updatedImage = {
            name: image.name,
            url: `/uploads/${filename}`,
        }
    }

    const updated = await BestSeller.findByIdAndUpdate(
        _id,
        { title, description, image: updatedImage },
        { new: true },
    )

    return NextResponse.json(updated, { status: 200 })
}

// DELETE: Delete social media and associated image
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

        const ourProducts = await BestSeller.findById(id)
        if (!ourProducts) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 },
            )
        }

        if (ourProducts.image?.url) {
            const filePath = path.join(
                process.cwd(),
                'public',
                ourProducts.image.url.replace('/uploads/', 'uploads/'),
            )
            try {
                await unlink(filePath)
            } catch (err) {
                console.warn(`Image already deleted or missing: ${filePath}`)
            }
        }

        await BestSeller.findByIdAndDelete(id)

        return NextResponse.json(
            { message: 'Deleted successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error deleting social media:', error)
        return NextResponse.json(
            { message: 'Error deleting item' },
            { status: 500 },
        )
    }
}
