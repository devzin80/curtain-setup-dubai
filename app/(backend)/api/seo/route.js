
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

        // Ensure focusKeyword is handled
        if (!data.page || typeof data.page !== 'string') {
            return new Response(
                JSON.stringify({ message: 'Page is required' }),
                { status: 400 },
            )
        }

        const newEntry = await SEO.create({
            ...data,
            focusKeyword: data.focusKeyword || '',
        })

        return Response.json(newEntry)
    } catch (err) {
        console.error('Error creating SEO entry:', err)
        return Response.json(
            { message: 'Error creating SEO entry', error: err.message },
            { status: 500 },
        )
    }
}