import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import SocialMedia from '../../models/socialmedias.model'
import { writeFile, unlink } from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'



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
    const socialMedias = await SocialMedia.find().lean()
    return NextResponse.json(socialMedias)
}

// POST: Create new social media
export async function POST(req) {
    await connectDB()
    const contentType = req.headers.get('content-type')

    if (contentType?.includes('multipart/form-data')) {
        const formData = await req.formData()
        const name = formData.get('name')
        const url = formData.get('url')
        const logo = await handleUpload(formData)

        const newMedia = await SocialMedia.create({
            name,
            url,
            logo: logo.length ? logo[0] : null,
        })

        return NextResponse.json(newMedia, { status: 201 })
    } else {
        const body = await req.json()
        const newMedia = await SocialMedia.create(body)
        return NextResponse.json(newMedia, { status: 201 })
    }
}

// PATCH: Update social media entry
export async function PATCH(req) {
    await connectDB()
    const { _id, name, url, logo } = await req.json()

    const existingMedia = await SocialMedia.findById(_id)
    if (!existingMedia) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Handle logo update if changed
    let updatedLogo = existingMedia.logo

    if (logo?.url?.startsWith('data:image')) {
        // Delete old logo if exists
        if (existingMedia.logo?.url) {
            const oldPath = path.join(
                process.cwd(),
                'public',
                existingMedia.logo.url.replace('/uploads/', 'uploads/'),
            )
            try {
                await fs.unlink(oldPath)
            } catch (err) {
                console.warn('Old image not found or already deleted.')
            }
        }

        // Save new logo to disk
        const ext = logo.name.split('.')[1]

        const base64Data = logo.url.split(',')[1]
        const buffer = Buffer.from(base64Data, 'base64')
        const filename = `${uuidv4()}.${ext}`
        const uploadDir = path.join(process.cwd(), 'public/uploads')
        await fs.mkdir(uploadDir, { recursive: true })
        const filePath = path.join(uploadDir, filename)
        await fs.writeFile(filePath, buffer)

        updatedLogo = {
            name: logo.name,
            url: `/uploads/${filename}`,
        }
    }

    const updated = await SocialMedia.findByIdAndUpdate(
        _id,
        { name, url, logo: updatedLogo },
        { new: true },
    )

    return NextResponse.json(updated, { status: 200 })
}



// DELETE: Delete social media and associated logo
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

        const socialMedia = await SocialMedia.findById(id)
        if (!socialMedia) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 },
            )
        }

        if (socialMedia.logo?.url) {
            const filePath = path.join(
                process.cwd(),
                'public',
                socialMedia.logo.url.replace('/uploads/', 'uploads/'),
            )
            try {
                await unlink(filePath)
            } catch (err) {
                console.warn(`Image already deleted or missing: ${filePath}`)
            }
        }

        await SocialMedia.findByIdAndDelete(id)

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
