import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decodeToken } from '@/lib/auth'

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
        return NextResponse.json({ role: null }, { status: 401 })
    }

    try {
        const decoded = decodeToken(token)
        return NextResponse.json({ role: decoded.role }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ role: null }, { status: 400 })
    }
}
