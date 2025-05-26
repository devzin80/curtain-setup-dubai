import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Phone from '../../models/phone.model'

export async function POST(req) {
    await connectDB()
    try {
        const body = await req.json()
        if (!body.phoneNumber) {
            return NextResponse.json(
                { error: 'Phone number is required' },
                { status: 400 },
            )
        }
        const phoneNumber = await Phone.create({
            phoneNumber: body.phoneNumber,
        })
        if (!phoneNumber) {
            return NextResponse.json(
                { error: 'Error creating phone number' },
                { status: 500 },
            )
        }
        return NextResponse.json(
            { message: 'Created', phoneNumber },
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
        const phoneNumbers = await Phone.find({}).lean()
        return NextResponse.json(phoneNumbers)
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 },
        )
    }
}

export async function PUT(req) {
    try {
        await connectDB()
        const { id, phoneNumber } = await req.json()
        if (!id || !phoneNumber) {
            return NextResponse.json(
                { error: 'ID and phone number are required' },
                { status: 400 },
            )
        }
        const updatedNumber = await Phone.findByIdAndUpdate(
            id,
            { phoneNumber },
            { new: true },
        )
        if (!updatedNumber) {
            return NextResponse.json(
                { error: 'Phone number not found' },
                { status: 404 },
            )
        }
        return NextResponse.json(
            { message: 'Updated', phone: updatedNumber },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error updating phone number:', error)
        return NextResponse.json(
            { error: 'Error updating phone number', details: error.message },
            { status: 500 },
        )
    }
}
