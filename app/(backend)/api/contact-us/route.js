import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Contact from '../../models/contact.model'

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json()
        if (!body.address) {
            return NextResponse.json(
                { message: 'Address is required' },
                { status: 400 },
            )
        }
        const contactAddress = await Contact.create({ address: body.address })
        if (!contactAddress) {
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
        const contact = await Contact.find({}).lean()
        return NextResponse.json(contact)
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
        const { id, address } = await req.json()
        if (!id || !address) {
            return NextResponse.json(
                { message: 'ID and address are required' },
                { status: 400 },
            )
        }
        await Contact.findByIdAndUpdate(id, { address })
        return NextResponse.json({ message: 'Updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}
