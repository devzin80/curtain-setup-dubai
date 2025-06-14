import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { verifyPassword, createToken } from '@/lib/auth'
import User from '@/app/(backend)/models/user.model'

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        await connectDB()

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 },
            )
        }

        const isMatch = await verifyPassword(password, user.passwordHash)
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 },
            )
        }

        const token = createToken(user)

        return NextResponse.json({
            token, // You send the token here
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        })
    } catch (err) {
        return NextResponse.json(
            { message: 'Login failed', error: err.message },
            { status: 500 },
        )
    }
}
