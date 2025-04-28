'use server'

import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'
import connectDB from '@/lib/db'

export async function uploadLogo(formData) {
    try {
        const file = formData.get('logo')

        if (!file) {
            throw new Error('No file uploaded')
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = file.name.replace(/\s+/g, '-').toLowerCase()
        const filepath = path.join(process.cwd(), 'public', 'logo', filename)

        await fs.writeFile(filepath, buffer)

        await connectDB.logo.create({
            data: {
                name: filename,
                path: `/logo/${filename}`,
            },
        })

        revalidatePath('/sordar/logo')
        return { success: true }
    } catch (error) {
        return { error: error.message }
    }
}

export async function updateLogo(id, formData) {
    try {
        const file = formData.get('logo')
        const oldLogo = await connectDB.logo.findUnique({ where: { id } })

        if (!file || !oldLogo) {
            throw new Error('Invalid request')
        }

        // Delete old file
        const oldPath = path.join(process.cwd(), 'public', oldLogo.path)
        await fs.unlink(oldPath)

        // Save new file
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = file.name.replace(/\s+/g, '-').toLowerCase()
        const filepath = path.join(process.cwd(), 'public', 'logo', filename)

        await fs.writeFile(filepath, buffer)

        await connectDB.logo.update({
            where: { id },
            data: {
                name: filename,
                path: `/logo/${filename}`,
            },
        })

        revalidatePath('/sordar/logo')
        return { success: true }
    } catch (error) {
        return { error: error.message }
    }
}

export async function deleteLogo(id) {
    try {
        const logo = await connectDB.logo.findUnique({ where: { id } })

        if (!logo) {
            throw new Error('Logo not found')
        }

        const filepath = path.join(process.cwd(), 'public', logo.path)
        await fs.unlink(filepath)

        await connectDB.logo.delete({ where: { id } })

        revalidatePath('/sordar/logo')
        return { success: true }
    } catch (error) {
        return { error: error.message }
    }
}

import React from 'react'

const LogoUploader = () => {
  return (
    <div>LogoUploader</div>
  )
}

export default LogoUploader