import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Email from '../../models/email.model'

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json()
        if (!body.email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 },
            )
        }
        const email = await Email.create({ email: body.email })
        if (!email) {
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
        const email = await Email.find({}).lean()
        return NextResponse.json(email)
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
        const { id, email } = await req.json()
        if (!id || !email) {
            return NextResponse.json(
                { message: 'ID and email are required' },
                { status: 400 },
            )
        }
        await Email.findByIdAndUpdate(id, { email })
        return NextResponse.json({ message: 'Updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}
