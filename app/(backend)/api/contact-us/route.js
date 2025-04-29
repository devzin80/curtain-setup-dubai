import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Contact from '../../models/contact.model'




export async function POST(req) {
    await connectDB()
    const body = await req.json()
    const contactAddress = await Contact.create({
        address: body.address,
    })
    if (!contactAddress) {
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
    const contact = await Contact.find({}).lean()
    return NextResponse.json(contact)
}


export async function PUT(req) {
    await connectDB()
    const { id, address } = await req.json()
    await Contact.findByIdAndUpdate(id, { address })
    return NextResponse.json({ message: 'Updated' }, { status: 200 })
}
