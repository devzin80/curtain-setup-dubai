import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Terms from '@/app/(backend)/models/terms.model'


export async function POST(req) {
    await connectDB()
    const body = await req.json()
    const newPost = await Terms.create({
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
    const terms = await Terms.find().lean()
    return NextResponse.json(terms)
}

export async function PUT(req) {
    await connectDB()
    const { id, content } = await req.json()
    await Terms.findByIdAndUpdate(id, { content })
    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}
