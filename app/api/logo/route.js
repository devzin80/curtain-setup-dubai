import { writeFile } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import connectDB from '@/lib/db'
import Logo from '@/models/logo.model'

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

        // Define the logo upload directory path
        const logoDir = path.join(process.cwd(), 'public', 'logo')

        // Ensure the logo directory exists, if not create it
        if (!fs.existsSync(logoDir)) {
            fs.mkdirSync(logoDir, { recursive: true })
        }

        const uploadedFiles = []

        // Loop over all the files (either one or multiple)
        for (const file of filesToProcess) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const ext = file.name.split('.').pop()
            const filename = file.name.split('.')[0]
            const filepath = path.join(logoDir, file.name)

            // Write file to the disk
            await writeFile(filepath, buffer)

            // Create the URL for the uploaded file
            const fileUrl = `/logo/${filename}.${ext}`

            // Push the uploaded file info to the array
            uploadedFiles.push({ filename, url: fileUrl })
        }

        // Connect to the database
        await connectDB()

        // Loop through each uploaded file and create a logo document for each one
        const logoPromises = uploadedFiles.map((file) =>
            Logo.create({ name: file.filename, url: file.url }),
        )

        // Wait for all logo documents to be created
        const newLogos = await Promise.all(logoPromises)

        // Debug: Log the response from the database
        console.log('Database Response:', newLogos)

        // Return the response with the uploaded logos' data
        return new Response(JSON.stringify({ logos: newLogos }), {
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
