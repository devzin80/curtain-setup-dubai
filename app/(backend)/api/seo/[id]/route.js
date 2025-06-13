import SEO from '@/app/(backend)/models/seo.model'
import connectDB from '@/lib/db'

export async function PUT(req, { params }) {
    await connectDB()
    try {
        const data = await req.json()

        // Ensure focusKeyword exists (even if empty string)
        if (data.focusKeyword === undefined) {
            data.focusKeyword = ''
        }

        const updated = await SEO.findByIdAndUpdate(params.id, data, {
            new: true,
        })

        if (!updated) {
            return Response.json(
                { error: 'SEO entry not found' },
                { status: 404 },
            )
        }

        return Response.json(updated)
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    await connectDB()
    try {
        const deleted = await SEO.findByIdAndDelete(params.id)
        if (!deleted) {
            return Response.json(
                { error: 'SEO entry not found' },
                { status: 404 },
            )
        }
        return Response.json({ message: 'SEO entry deleted successfully' })
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 })
    }
}
