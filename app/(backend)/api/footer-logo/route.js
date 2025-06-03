import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import fs from 'fs'
import connectDB from '@/lib/db'
import FooterLogo from '../../models/footerLogo.model'
import { NextResponse } from 'next/server'

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

        const logoDir = path.join(process.cwd(), 'public', 'logo')
        if (!fs.existsSync(logoDir)) {
            fs.mkdirSync(logoDir, { recursive: true })
        }

        const uploadedFiles = []

        for (const file of filesToProcess) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const ext = file.name.split('.').pop()
            const filename = file.name.split('.')[0]
            const filepath = path.join(logoDir, file.name)

            await writeFile(filepath, buffer)

            const fileUrl = `https://curtainsetup.ae/public/logo/${filename}.${ext}`
            
            uploadedFiles.push({ filename, url: fileUrl })
        }

        await connectDB()
        const logoPromises = uploadedFiles.map((file) =>
            FooterLogo.create({ name: file.filename, url: file.url }),
        )
        const newLogos = await Promise.all(logoPromises)

        return NextResponse.json({ logos: newLogos }, { status: 200 })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connectDB()
        const logos = await FooterLogo.find({}).lean()
        return NextResponse.json(logos, { status: 200 })
    } catch (error) {
        // console.error('Fetch error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        const formData = await req.formData()
        const file = formData.get('file')
        const logoId = formData.get('_id')

        if (!file || !logoId) {
            return NextResponse.json(
                { error: 'Missing file or _id' },
                { status: 400 },
            )
        }

        await connectDB()
        const existingLogo = await FooterLogo.findById(logoId)

        if (!existingLogo) {
            return NextResponse.json(
                { error: 'Logo not found' },
                { status: 404 },
            )
        }

        // Delete old file
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
        const { name: filename, ext } = path.parse(file.name)
        const newFilePath = path.join(
            process.cwd(),
            'public',
            'logo',
            `${filename}${ext}`,
        )

        const logoDir = path.join(process.cwd(), 'public', 'logo')
        if (!fs.existsSync(logoDir)) {
            fs.mkdirSync(logoDir, { recursive: true })
        }

        await writeFile(newFilePath, buffer)

        // Update DB
        const newUrl =`https://curtainsetup.ae/public/logo/${filename}.${ext}`
        existingLogo.url = newUrl
        existingLogo.name = filename
        await existingLogo.save()

        return NextResponse.json(
            { message: 'Logo updated', logo: existingLogo },
            { status: 200 },
        )
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
