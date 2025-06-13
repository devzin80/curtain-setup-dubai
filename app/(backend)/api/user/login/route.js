import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { cookies } from 'next/headers'
import { verifyPassword, createToken } from '@/lib/auth'
import User from '@/app/(backend)/models/user.model'

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        const cookieStore = await cookies()
        await connectDB()

        const user = await User.findOne({ email })
        if (!user)
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 },
            )

        const isMatch = await verifyPassword(password, user.passwordHash)
        if (!isMatch)
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 },
            )

        const token = createToken(user)
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: 'lax',
        })
        return NextResponse.json({
            token,
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
