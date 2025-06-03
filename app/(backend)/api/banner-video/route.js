import { NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import connectDB from '@/lib/db'
import Video from '../../models/video.model'

// Utility: create uploads directory if not exists
const videoDir = path.join(process.cwd(), 'public', 'video')
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true })

// ✅ POST: Upload video(s)
export async function POST(req) {
    try {
        const formData = await req.formData()
        const files = formData.getAll('file')
        const filesToProcess = files.length > 1 ? files : [files[0]]

        if (!filesToProcess || filesToProcess.length === 0) {
            return NextResponse.json(
                { error: 'No files uploaded' },
                { status: 400 },
            )
        }

        const uploadedFiles = []

        for (const file of filesToProcess) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const { name: filename, ext } = path.parse(file.name)
            const filepath = path.join(videoDir, `${filename}${ext}`)

            await writeFile(filepath, buffer)
            uploadedFiles.push({ filename, url: `https://curtainsetup.ae/public/video/${filename}${ext}` })
        }

        await connectDB()

        const videoPromises = uploadedFiles.map((file) =>
            Video.create({ name: file.filename, url: file.url }),
        )
        const newVideos = await Promise.all(videoPromises)

        return NextResponse.json({ videos: newVideos }, { status: 200 })
    } catch (error) {
        // console.error('Upload error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

// ✅ GET: Fetch all videos
export async function GET() {
    try {
        await connectDB()
        const videos = await Video.find({}).lean()
        return NextResponse.json(videos, { status: 200 })
    } catch (error) {
        // console.error('Get videos error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

// ✅ PATCH: Update video file
export async function PATCH(req) {
    try {
        const formData = await req.formData()
        const file = formData.get('file')
        const videoId = formData.get('_id')

        if (!file || !videoId) {
            return NextResponse.json(
                { error: 'Missing file or _id' },
                { status: 400 },
            )
        }

        await connectDB()
        const existingVideo = await Video.findById(videoId)

        if (!existingVideo) {
            return NextResponse.json(
                { error: 'Video not found' },
                { status: 404 },
            )
        }

        const oldFilePath = path.join(
            process.cwd(),
            'public',
            existingVideo.url || '',
        )
        if (fs.existsSync(oldFilePath)) {
            await unlink(oldFilePath)
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const { name: filename, ext } = path.parse(file.name)
        const newFilePath = path.join(videoDir, `${filename}${ext}`)

        await writeFile(newFilePath, buffer)

        const newUrl = `https://curtainsetup.ae/public/video/${filename}${ext}`
        existingVideo.url = newUrl
        existingVideo.name = filename
        await existingVideo.save()

        return NextResponse.json(
            { message: 'Video updated', video: existingVideo },
            { status: 200 },
        )
    } catch (error) {
        // console.error('Update error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
