import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Email from '../../models/email.model'


export async function POST(req) {
    await connectDB()
    const body = await req.json()
    const email = await Email.create({
        email: body.email,
    })
    if (!email) {
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
    const email = await Email.find({}).lean()
    return NextResponse.json(email)
}

export async function PUT(req) {
    await connectDB()
    const { id, email } = await req.json()
    await Email.findByIdAndUpdate(id, { email })
    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}
