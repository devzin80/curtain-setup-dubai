import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Privacy from '@/app/(backend)/models/privacy.model'

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json()
        if (!body.content) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 },
            )
        }
        const newPost = await Privacy.create({ content: body.content })
        if (!newPost) {
            return NextResponse.json(
                { error: 'Error creating post' },
                { status: 500 },
            )
        }
        return NextResponse.json(
            { message: 'Created', post: newPost },
            { status: 201 },
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}

export async function GET() {
    await connectDB()
    try {
        const privacy = await Privacy.find().lean()
        return NextResponse.json(privacy)
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}

export async function PUT(req) {
    await connectDB()
    try {
        const { id, content } = await req.json()
        if (!id || !content) {
            return NextResponse.json(
                { error: 'ID and content are required' },
                { status: 400 },
            )
        }
        const updated = await Privacy.findByIdAndUpdate(
            id,
            { content },
            { new: true },
        )
        if (!updated) {
            return NextResponse.json(
                { error: 'Privacy post not found' },
                { status: 404 },
            )
        }
        return NextResponse.json(
            { message: 'Updated', post: updated },
            { status: 200 },
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}
