
import connectDB from '@/lib/db'
import SEO from '../../models/seo.model'


export async function GET() {
    await connectDB()
    const seo = await SEO.find().sort({ createdAt: -1 })
    return Response.json(seo)
}

export async function POST(req) {
    await connectDB()
    try {
        const data = await req.json()
        const newEntry = await SEO.create(data)
        return Response.json(newEntry)
    } catch (err) {
        console.error('Error creating SEO entry:', err)
        return Response.json({ message: 'Error creating SEO entry', error: err.message }, { status: 500 })
    }
}
