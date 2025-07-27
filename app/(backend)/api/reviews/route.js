import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Review from '../../models/reviews.model'
import { writeFile, unlink } from 'fs/promises'
import { mkdirSync, existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'


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
        url: `https://curtainsetup.ae/public/uploads/${filename}`,
    }
}




export async function GET() {
    try {
        await connectDB()
        const reviews = await Review.find().sort({ createdAt: -1 })
        return NextResponse.json(
            { success: true, data: reviews },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reviews' },
            { status: 500 },
        )
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()

        const { name, review, rating, image } = body

        let savedImage = null
        if (image && image.url?.startsWith('data:image')) {
            savedImage = await saveBase64Image(image)
        } else if (image && image.url && image.name) {
            // if image is already uploaded url, use as is
            savedImage = image
        }

        if (!name || !review || !rating) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Name, review, and rating are required',
                },
                { status: 400 },
            )
        }

        const newReview = new Review({
            name,
            review,
            rating,
            image: savedImage,
        })
        await newReview.save()

        return NextResponse.json(
            { success: true, data: newReview },
            { status: 201 },
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create review' },
            { status: 500 },
        )
    }
}