import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import Calculator from '../../models/calculator.model'

// export async function POST(req) {
//     await connectDB()
//     const body = await req.json()
//     const calculator = await Calculator.create({
//         name: body.name,
//         hasVariants: body.hasVariants,
//         price: body.price,
//         factor: body.factor,
//         variants: body.variants,
//     })
//     if (!calculator) {
//         return NextResponse.json(
//             { message: 'Error creating post' },
//             { status: 500 },
//         )
//     } else {
//         return NextResponse.json({ message: 'Created' }, { status: 201 })
//     }
// }

// export async function PATCH(req) {
//     await connectDB()

//     const body = await req.json()
//     const { id, name, hasVariants, price, factor, variants } = body

//     try {
//         const updated = await Calculator.findByIdAndUpdate(
//             id,
//             {
//                 name,
//                 hasVariants,
//                 price,
//                 factor,
//                 variants, // should match the structure defined by VariantSchema
//             },
//             { new: true, runValidators: true },
//         )

//         if (!updated) {
//             return NextResponse.json(
//                 { message: 'Calculator not found' },
//                 { status: 404 },
//             )
//         }

//         return NextResponse.json(
//             { message: 'Updated successfully' },
//             { status: 200 },
//         )
//     } catch (error) {
//         return NextResponse.json(
//             { message: 'Update failed', error: error.message },
//             { status: 500 },
//         )
//     }
// }


// export async function GET() {
//     await connectDB()
//     console.log('I am in calculator');
    

//     const calculator = await Calculator.find({}).lean()
//     return NextResponse.json(calculator)
// }

// export async function DELETE(req) {
//     await connectDB()

//     // Extract the id from the URL params (e.g., /api/calculator/:id)
//     const url = new URL(req.url)
//     const id = url.pathname.split('/').pop() // Assuming your route is like /api/calculator/:id

//     console.log(id) // Check the id in the console

//     try {
//         const deleted = await Calculator.findByIdAndDelete(id)

//         if (!deleted) {
//             return NextResponse.json(
//                 { message: 'Calculator not found' },
//                 { status: 404 },
//             )
//         }

//         return NextResponse.json(
//             { message: 'Deleted successfully' },
//             { status: 200 },
//         )
//     } catch (error) {
//         return NextResponse.json(
//             { message: 'Delete failed', error: error.message },
//             { status: 500 },
//         )
//     }
// }


// /pages/api/calculator.js


// POST - Create a new calculator
export async function POST(req) {
    await connectDB()
    const body = await req.json()

    try {
        const calculator = await Calculator.create({
            name: body.name,
            hasVariants: body.hasVariants,
            price: body.price,
            factor: body.factor,
            variants: body.variants,
        })

        return NextResponse.json({ message: 'Created' }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Error creating calculator', error: error.message },
            { status: 500 }
        )
    }
}

// PATCH - Update an existing calculator
export async function PATCH(req) {
    await connectDB()
    const body = await req.json()
    console.log(body);
    
    const { id, name, hasVariants, price, factor, variants } = body

    try {
        const updated = await Calculator.findByIdAndUpdate(
            id,
            { name, hasVariants, price, factor, variants },
            { new: true, }
        )

        if (!updated) {
            return NextResponse.json(
                { message: 'Calculator not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Updated successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Update failed', error: error.message },
            { status: 500 }
        )
    }
}

// GET - Fetch all calculators
export async function GET() {
    await connectDB()

    try {
        const calculators = await Calculator.find({}).lean()
        return NextResponse.json(calculators)
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch calculators', error: error.message },
            { status: 500 }
        )
    }
}

// DELETE - Delete a calculator by ID
// export async function DELETE(req) {
//     await connectDB()

//     // Extract id from the query parameters
//     const { id } = req.query

//     try {
//         const deleted = await Calculator.findByIdAndDelete(id)

//         if (!deleted) {
//             return NextResponse.json(
//                 { message: 'Calculator not found' },
//                 { status: 404 }
//             )
//         }

//         return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
//     } catch (error) {
//         return NextResponse.json(
//             { message: 'Delete failed', error: error.message },
//             { status: 500 }
//         )
//     }
// }

export async function DELETE(req) {
    await connectDB()

    const { id } = await req.json()

    if (!id) {
        return NextResponse.json({ message: 'ID missing' }, { status: 400 })
    }

    try {
        const deleted = await Calculator.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json({ message: 'Not found' }, { status: 404 })
        }

        return NextResponse.json(
            { message: 'Deleted successfully' },
            { status: 200 },
        )
    } catch (err) {
        return NextResponse.json(
            { message: 'Delete failed', error: err.message },
            { status: 500 },
        )
    }
}


