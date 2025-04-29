import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import SocialMedia from '../../models/socialmedias.model'


export async function POST(req) {
    await connectDB()
    const body = await req.json()
    const socialMedias = await SocialMedia.create({
        content: body.socialMedias,
    })
    if (!socialMedias) {
        return NextResponse.json(
            { message: 'Error creating post' },
            { status: 500 },
        )
    } else {
        return NextResponse.json({ message: 'Created' }, { status: 201 })
    }
}

export async function GET() {
    await connectDB()
    const socialMedias = await SocialMedia.find().lean()
    return NextResponse.json(socialMedias)
}

export async function PUT(req) {
    await connectDB()
    const { id, socialMedias } = await req.json()
    await SocialMedia.findByIdAndUpdate(id, { socialMedias })
    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}
