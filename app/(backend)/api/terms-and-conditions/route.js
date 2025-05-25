import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Terms from '@/app/(backend)/models/terms.model'

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json()
        if (!body.content) {
            return NextResponse.json(
                { message: 'Content is required' },
                { status: 400 },
            )
        }
        const newPost = await Terms.create({ content: body.content })
        if (!newPost) {
            return NextResponse.json(
                { message: 'Error creating post' },
                { status: 500 },
            )
        }
        return NextResponse.json({ message: 'Created' }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}

export async function GET() {
    await connectDB()
    try {
        const terms = await Terms.find().lean()
        return NextResponse.json(terms)
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
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
                { message: 'ID and content are required' },
                { status: 400 },
            )
        }
        await Terms.findByIdAndUpdate(id, { content })
        return NextResponse.json({ message: 'Updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}
