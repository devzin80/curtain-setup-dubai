import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import connectDB from '@/lib/db'
import Video from '../../models/video.model'

export async function POST(req) {
    try {
        const formData = await req.formData()
        // Get all files from the form data
        const files = formData.getAll('file')
        // If there is a single file, wrap it in an array for consistency
        const filesToProcess = files.length > 1 ? files : [files[0]]
        // Check if files are provided
        if (!filesToProcess || filesToProcess.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No files uploaded' }),
                { status: 400 },
            )
        }
        // Define the video upload directory path
        const videoDir = path.join(process.cwd(), 'public', 'video')
        // Ensure the video directory exists, if not create it
        if (!fs.existsSync(videoDir)) {
            fs.mkdirSync(videoDir, { recursive: true })
        }
        const uploadedFiles = []
        // Loop over all the files (either one or multiple)
        for (const file of filesToProcess) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const { name: filename, ext } = path.parse(file.name)
            const filepath = path.join(videoDir, `${filename}${ext}`)
            // Write file to the disk
            await writeFile(filepath, buffer)
            // Create the URL for the uploaded file
            const fileUrl = `/video/${filename}${ext}`
            // Push the uploaded file info to the array
            uploadedFiles.push({ filename, url: fileUrl })
        }
        // Connect to the database
        await connectDB()
        // Loop through each uploaded file and create a video document for each one
        const videoPromises = uploadedFiles.map((file) =>
            Video.create({ name: file.filename, url: file.url }),
        )
        // Wait for all video documents to be created
        const newVideos = await Promise.all(videoPromises)
        // Return the response with the uploaded videos' data
        return new Response(JSON.stringify({ videos: newVideos }), {
            status: 200,
        })
    } catch (error) {
        console.error('Upload error:', error)
        // Return a server error response if something goes wrong
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
        })
    }
}

export async function GET() {
    await connectDB()
    const videos = await Video.find({}).lean()
    return Response.json(videos)
}

export async function PATCH(req) {
    try {
        const formData = await req.formData()
        const file = formData.get('file')
        const videoId = formData.get('_id')

        if (!file || !videoId) {
            return new Response(
                JSON.stringify({ error: 'Missing file or _id' }),
                { status: 400 },
            )
        }

        // Connect to database
        await connectDB()

        // Find existing video
        const existingVideo = await Video.findById(videoId)
        if (!existingVideo) {
            return new Response(JSON.stringify({ error: 'Video not found' }), {
                status: 404,
            })
        }

        // Delete old file if it exists
        const oldFilePath = path.join(
            process.cwd(),
            'public',
            existingVideo.url || '',
        )
        if (fs.existsSync(oldFilePath)) {
            await unlink(oldFilePath)
        }

        // Save new file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const { name: filename, ext } = path.parse(file.name)
        const newFilePath = path.join(
            process.cwd(),
            'public',
            'video',
            `${filename}${ext}`,
        )

        // Ensure video directory exists
        const videoDir = path.join(process.cwd(), 'public', 'video')
        if (!fs.existsSync(videoDir)) {
            fs.mkdirSync(videoDir, { recursive: true })
        }

        await writeFile(newFilePath, buffer)

        // Update video in DB
        const newUrl = `/video/${filename}${ext}`
        existingVideo.url = newUrl
        existingVideo.name = filename
        await existingVideo.save()

        return new Response(
            JSON.stringify({ message: 'Video updated', video: existingVideo }),
            {
                status: 200,
            },
        )
    } catch (error) {
        console.error('Update error:', error)
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
        })
    }
}
