import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Phone from '../../models/phone.model'

export async function POST(req) {
    await connectDB()
    const body = await req.json()
    console.log('from body', body)

    const phoneNumber = await Phone.create({
        phoneNumber: body.phoneNumber,
    })
    if (!phoneNumber) {
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
    const phoneNumber = await Phone.find({}).lean()
    return NextResponse.json(phoneNumber)
}

// export async function PUT(req) {
//     await connectDB()
//     const { id, phoneNumber } = await req.json()
//     await Contact.findByIdAndUpdate(id, { phoneNumber })
//     return NextResponse.json({ message: 'Updated' }, { status: 200 })
// }

export async function PUT(req) {
    try {
        await connectDB()
        const { id, phoneNumber } = await req.json()

        const updatedNumber = await Phone.findByIdAndUpdate(id, { phoneNumber })

        return NextResponse.json({ message: 'Updated' }, { status: 200 })
    } catch (error) {
        console.error('Error updating phone number:', error)
        return NextResponse.json(
            { message: 'Error updating phone number' },
            { status: 500 },
        )
    }
}
