import connectDB from '@/lib/db'
import Product from '../../../models/product.model'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    try {
        await connectDB()
        const { slug } = await params
        const product = await Product.findOne({ slug }).lean()
        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 },
            )
        }
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

// app/(backend)/api/best-selling-products/[slug]/route.js
