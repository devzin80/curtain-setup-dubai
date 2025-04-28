import { unlink } from 'fs/promises'
import path from 'path'
import connectDB  from '@/lib/db'
import Logo from '@/models/logo.model'

// Delete a specific file
// export async function DELETE(req, { params }) {
//     const { id, filename } = params

//     try {
//         await connectDB()

//         const logo = await Logo.findById(id)
//         if (!logo)
//             return Response.json({ error: 'Logo not found' }, { status: 404 })

//         const fileToDelete = logo.files.find(
//             (file) => file.filename === filename,
//         )
//         if (!fileToDelete)
//             return Response.json({ error: 'File not found' }, { status: 404 })

//         const filePath = path.join(process.cwd(), 'public', fileToDelete.url)
//         await unlink(filePath)

//         logo.files = logo.files.filter((file) => file.filename !== filename)
//         await logo.save()

//         return Response.json({ success: true })
//     } catch (error) {
//         console.error('Delete error:', error)
//         return Response.json({ error: 'Server error' }, { status: 500 })
//     }
// }

// Replace file (coming soon if you want PATCH support)
export async function PATCH(req, { params }) {
    const { id } = params
    
    try {
        await connectDB()

        const formData = await req.formData()
        const file = formData.get('file')
        const oldFilename = formData.get('oldFilename')

        if (!file || !oldFilename) {
            return Response.json({ error: 'File and old filename are required' }, { status: 400 })
        }

        const logo = await Logo.findById(id)
        if (!logo) {
            return Response.json({ error: 'Logo not found' }, { status: 404 })
        }

        const oldFile = logo.files.find(file => file.filename === oldFilename)
        if (!oldFile) {
            return Response.json({ error: 'Original file not found' }, { status: 404 })
        }

        // Delete old file
        const oldFilePath = path.join(process.cwd(), 'public', oldFile.url)
        await unlink(oldFilePath)

        // Save new file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = file.name
        const fileUrl = `/uploads/${filename}`
        const newFilePath = path.join(process.cwd(), 'public', fileUrl)

        await writeFile(newFilePath, buffer)

        // Update file in database
        const fileIndex = logo.files.findIndex(file => file.filename === oldFilename)
        logo.files[fileIndex] = {
            filename,
            url: fileUrl,
            type: file.type,
            size: file.size
        }

        await logo.save()

        return Response.json({ success: true, file: logo.files[fileIndex] })
    } catch (error) {
        console.error('Patch error:', error)
        return Response.json({ error: 'Server error' }, { status: 500 })
    }
}

