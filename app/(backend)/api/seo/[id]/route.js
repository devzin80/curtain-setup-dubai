import SEO from '@/app/(backend)/models/seo.model'
import connectDB from '@/lib/db'




export async function PUT(req, { params }) {
    await connectDB()
    try {
        const data = await req.json()
        const updated = await SEO.findByIdAndUpdate(params.id, data, {
            new: true,
        })

        if (!updated) {
            return new Response(
                JSON.stringify({ error: 'SEO entry not found' }),
                { status: 404 },
            )
        }

        return Response.json(updated)
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        })
    }
}
