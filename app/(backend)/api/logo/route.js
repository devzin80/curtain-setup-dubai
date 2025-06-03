import { NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import connectDB from '@/lib/db'
import Logo from '../../models/logo.model'


const LOGO_DIR = path.join(process.cwd(), 'public', 'uploads')
if (!existsSync(LOGO_DIR)) {
    mkdirSync(LOGO_DIR, { recursive: true })
}

// Helper: save uploaded file to disk
async function handleLogoUpload(file) {
    if (!file || typeof file.arrayBuffer !== 'function') return null

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = path.extname(file.name)
    const filename = `${uuidv4()}${ext}`
    const filePath = path.join(LOGO_DIR, filename)

    await writeFile(filePath, buffer)

    return {
        name: file.name,
        url: `/uploads/${filename}`,
        path: filePath,
    }
}

// POST - Upload new logo (replace if exists)
export async function POST(req) {
    try {
        await connectDB()

        const contentType = req.headers.get('content-type') || ''
        if (!contentType.includes('multipart/form-data')) {
            return NextResponse.json(
                { error: 'Invalid content type, multipart/form-data expected' },
                { status: 400 },
            )
        }

        const formData = await req.formData()
        const file = formData.get('file')
        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 },
            )
        }

        const newLogo = await handleLogoUpload(file)
        if (!newLogo) {
            return NextResponse.json(
                { error: 'File upload failed' },
                { status: 400 },
            )
        }

        // Delete old logo if exists
        const existing = await Logo.findOne()
        if (existing) {
            const oldPath = path.join(process.cwd(), 'public', existing.url)
            if (existsSync(oldPath)) {
                await unlink(oldPath)
            }
            await Logo.deleteOne({ _id: existing._id })
        }

        const savedLogo = await Logo.create({
            name: newLogo.name,
            url: newLogo.url,
        })

        return NextResponse.json({ logo: savedLogo }, { status: 201 })
    } catch (error) {
        console.error('POST /api/logo error:', error)
        return NextResponse.json(
            { error: 'Failed to upload logo' },
            { status: 500 },
        )
    }
}

// GET - Get current logo
export async function GET() {
    try {
        await connectDB()
        const logo = await Logo.findOne().lean()
        return NextResponse.json({ logo }, { status: 200 })
    } catch (error) {
        console.error('GET /api/logo error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch logo' },
            { status: 500 },
        )
    }
}

// PATCH - Update logo (replace image)
export async function PATCH(req) {
    try {
        await connectDB()

        const contentType = req.headers.get('content-type') || ''
        if (!contentType.includes('multipart/form-data')) {
            return NextResponse.json(
                { error: 'Invalid content type, multipart/form-data expected' },
                { status: 400 },
            )
        }

        const formData = await req.formData()
        const file = formData.get('file')

        const existing = await Logo.findOne()
        if (!existing) {
            return NextResponse.json(
                { error: 'No logo found to update' },
                { status: 404 },
            )
        }

        if (file) {
            const newLogo = await handleLogoUpload(file)
            if (!newLogo) {
                return NextResponse.json(
                    { error: 'File upload failed' },
                    { status: 400 },
                )
            }

            // Delete old file
            const oldPath = path.join(process.cwd(), 'public', existing.url)
            if (existsSync(oldPath)) {
                await unlink(oldPath)
            }

            existing.name = newLogo.name
            existing.url = newLogo.url
        }

        await existing.save()
        return NextResponse.json({ logo: existing }, { status: 200 })
    } catch (error) {
        // console.error('PATCH /api/logo error:', error)
        return NextResponse.json(
            { error: 'Failed to update logo' },
            { status: 500 },
        )
    }
}
