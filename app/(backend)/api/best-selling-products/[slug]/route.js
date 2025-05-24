import connectDB from '@/lib/db'
import Product from '../../../models/product.model'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    await connectDB()

    const { slug } = await params
    console.log(slug);
    

    const product = await Product.find({ slug }).lean()

    return NextResponse.json(product)
}

// app/(backend)/api/best-selling-products/[slug]/route.js

