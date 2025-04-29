import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import connectDB from '@/lib/db'
import FooterLogo from '../../models/footerLogo.model'


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
            FooterLogo.create({ name: file.filename, url: file.url }),
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

export async function GET() {
    await connectDB()
    const logos = await FooterLogo.find({}).lean()
    return Response.json(logos)
}

export async function PATCH(req) {
    try {
        const formData = await req.formData()
        const file = formData.get('file')
        const logoId = formData.get('_id')

        if (!file || !logoId) {
            return new Response(
                JSON.stringify({ error: 'Missing file or _id' }),
                { status: 400 },
            )
        }

        // Connect to database
        await connectDB()

        // Find existing logo
        const existingLogo = await FooterLogo.findById(logoId)
        if (!existingLogo) {
            return new Response(JSON.stringify({ error: 'Logo not found' }), {
                status: 404,
            })
        }

        // Delete old file if it exists
        const oldFilePath = path.join(
            process.cwd(),
            'public',
            existingLogo.url || '',
        )
        if (fs.existsSync(oldFilePath)) {
            await unlink(oldFilePath)
        }

        // Save new file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const ext = file.name.split('.').pop()
        const filename = file.name.split('.')[0]
        const newFilePath = path.join(
            process.cwd(),
            'public',
            'logo',
            file.name,
        )

        // Ensure logo directory exists
        const logoDir = path.join(process.cwd(), 'public', 'logo')
        if (!fs.existsSync(logoDir)) {
            fs.mkdirSync(logoDir, { recursive: true })
        }

        await writeFile(newFilePath, buffer)

        // Update logo in DB
        const newUrl = `/logo/${filename}.${ext}`
        existingLogo.url = newUrl
        existingLogo.name = filename
        await existingLogo.save()

        return new Response(
            JSON.stringify({ message: 'Logo updated', logo: existingLogo }),
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
