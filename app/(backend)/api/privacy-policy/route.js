import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Privacy from '@/app/(backend)/models/privacy.model'

export async function POST(req) {
    await connectDB()
    const body = await req.json()
    const newPost = await Privacy.create({
        content: body.content,
    })
    if (!newPost) {
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
    const privacy = await Privacy.find().lean()
    return NextResponse.json(privacy)
}

export async function PUT(req) {
    await connectDB()
    const { id, content } = await req.json()
    await Privacy.findByIdAndUpdate(id, { content })
    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}
