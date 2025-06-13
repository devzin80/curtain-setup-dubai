import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'

import { hashPassword, verifyPassword, createToken } from '@/lib/auth'
import User from '../../models/user.model'

// Register a user
export async function POST(req) {
    try {
        const { email, password , role} = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 },
            )
        }

        await connectDB()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 409 },
            )
        }

        const passwordHash = await hashPassword(password)
        const user = await User.create({ email, passwordHash, role })

        return NextResponse.json(
            { message: 'User registered', userId: user._id },
            { status: 201 },
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 },
        )
    }
}

// Get all users (admin use)
export async function GET() {
    try {
        await connectDB()
        const users = await User.find().select('-passwordHash') // remove password hash from response
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch users', error: error.message },
            { status: 500 },
        )
    }
}

// Delete a user by ID: DELETE /api/user?id=<id>
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('id')

        if (!userId)
            return NextResponse.json(
                { message: 'User ID is required' },
                { status: 400 },
            )

        await connectDB()
        const deleted = await User.findByIdAndDelete(userId)

        if (!deleted)
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 },
            )

        return NextResponse.json({ message: 'User deleted' })
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to delete user', error: error.message },
            { status: 500 },
        )
    }
}


export async function PATCH(req) {
    try {
       
        const body = await req.json()
        const {userId} = body
        if (!userId) {
            return NextResponse.json(
                { message: 'User ID is required' },
                { status: 400 },
            )
        }
        const updates = {}

        if (body.email) updates.email = body.email
        if (body.password)
            updates.passwordHash = await hashPassword(body.password)
        if (body.role) updates.role = body.role // 🔐 Only allow this if role control is needed

        await connectDB()
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        })

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 },
            )
        }

        return NextResponse.json({
            message: 'User updated',
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        })
    } catch (err) {
        return NextResponse.json(
            { message: 'Failed to update user', error: err.message },
            { status: 500 },
        )
    }
}