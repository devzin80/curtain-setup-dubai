// import { NextResponse } from 'next/server'
// import { writeFile, unlink } from 'fs/promises'
// import path from 'path'
// import { mkdirSync, existsSync } from 'fs'
// import { v4 as uuidv4 } from 'uuid'
// import connectDB from '@/lib/db'
// import Product from '../../models/product.model'

// const uploadDir = path.join(process.cwd(), 'public', 'uploads')
// if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

// const handleUpload = async (formData) => {
//     const files = formData.getAll('files')
//     const uploaded = []

//     for (const file of files) {
//         if (file && file.name) {
//             const buffer = Buffer.from(await file.arrayBuffer())
//             const ext = path.extname(file.name)
//             const filename = `${uuidv4()}${ext}`
//             const filepath = path.join(uploadDir, filename)

//             await writeFile(filepath, buffer)
//             uploaded.push({ name: file.name, url: `/uploads/${filename}` })
//         }
//     }
//     return uploaded
// }

// // ✅ GET: Fetch all or filtered by category
// export async function GET(req) {
//     try {
//         await connectDB()
//         const { searchParams } = new URL(req.url)
//         const category = searchParams.get('category')

//         const products = category
//             ? await Product.find({ category })
//             : await Product.find()

//         return NextResponse.json(products)
//     } catch (err) {
//         return NextResponse.json(
//             { error: err.message || 'Failed to fetch products' },
//             { status: 500 },
//         )
//     }
// }

// // ✅ POST: Create product
// export async function POST(req) {
//     try {
//         await connectDB()
//         const contentType = req.headers.get('content-type')

//         if (contentType?.includes('multipart/form-data')) {
//             const formData = await req.formData()
//             const name = formData.get('name')
//             const slug = formData.get('slug')
//             const category = formData.get('category')
//             const description = formData.get('description')

//             const images = await handleUpload(formData)

//             const product = await Product.create({
//                 name,
//                 slug,
//                 category,
//                 description,
//                 images,
//             })

//             return NextResponse.json(product, { status: 201 })
//         } else {
//             const body = await req.json()
//             const product = await Product.create(body)
//             return NextResponse.json(product, { status: 201 })
//         }
//     } catch (err) {
//         return NextResponse.json(
//             { error: err.message || 'Failed to create product' },
//             { status: 500 },
//         )
//     }
// }

// // ✅ PATCH: Update product
// // export async function PATCH(req) {
// //     try {
// //         await connectDB()
// //         console.log('PATCH request received');
        
// //         const body = await req.json()
// //         console.log('Request body:', body);
        
// //         const { _id, ...updateData } = body
// //         console.log('Update data:', updateData);
// //         console.log('_id:', _id);
        

// //         const updatedProduct = await Product.findByIdAndUpdate(
// //             _id,
// //             updateData,
// //             {
// //                 new: true,
// //             },
// //         )
// //         console.log('Updated product:', updatedProduct);

// //         if (!updatedProduct) {
// //             return NextResponse.json(
// //                 { error: 'Product not found' },
// //                 { status: 404 },
// //             )
// //         }

// //         return NextResponse.json(updatedProduct)
// //     } catch (err) {
// //         return NextResponse.json(
// //             { error: err.message || 'Failed to update product' },
// //             { status: 500 },
// //         )
// //     }
// // }

// // ✅ DELETE: Remove product and images
// export async function DELETE(req) {
//     try {
//         await connectDB()
//         const { searchParams } = new URL(req.url)
//         const id = searchParams.get('id')

//         if (!id) {
//             return NextResponse.json(
//                 { error: 'ID is required' },
//                 { status: 400 },
//             )
//         }

//         const product = await Product.findById(id)
//         if (!product) {
//             return NextResponse.json(
//                 { error: 'Product not found' },
//                 { status: 404 },
//             )
//         }

//         // Delete image files
//         for (const img of product.images || []) {
//             const filePath = path.join(process.cwd(), 'public', img.url)
//             try {
//                 await unlink(filePath)
//             } catch (err) {
//                 console.warn(`Image already deleted or missing: ${filePath}`)
//             }
//         }

//         await Product.findByIdAndDelete(id)

//         return NextResponse.json(
//             { message: 'Product deleted successfully' },
//             { status: 200 },
//         )
//     } catch (err) {
//         return NextResponse.json(
//             { error: err.message || 'Failed to delete product' },
//             { status: 500 },
//         )
//     }
// }


// // modified patch

// // export async function PATCH(req) {
// //     try {
// //         await connectDB()
// //         const contentType = req.headers.get('content-type')

// //         let _id
// //         let updateData = {}

// //         if (contentType?.includes('multipart/form-data')) {
// //             const formData = await req.formData()
// //             _id = formData.get('_id')

// //             const name = formData.get('name')
// //             const slug = formData.get('slug')
// //             const category = formData.get('category')
// //             const description = formData.get('description')

// //             const images = await handleUpload(formData)

// //             updateData = { name, slug, category, description, images }
// //         } else {
// //             const body = await req.json()
// //             _id = body._id
// //             updateData = { ...body }
// //             delete updateData._id
// //         }

// //         if (!_id) {
// //             return NextResponse.json(
// //                 { error: '_id is required' },
// //                 { status: 400 },
// //             )
// //         }

// //         const updatedProduct = await Product.findByIdAndUpdate(
// //             _id,
// //             updateData,
// //             {
// //                 new: true,
// //             },
// //         )

// //         if (!updatedProduct) {
// //             return NextResponse.json(
// //                 { error: 'Product not found' },
// //                 { status: 404 },
// //             )
// //         }

// //         return NextResponse.json(updatedProduct)
// //     } catch (err) {
// //         return NextResponse.json(
// //             { error: err.message || 'Failed to update product' },
// //             { status: 500 },
// //         )
// //     }
// // }

// export async function PATCH(req) {
//     try {
//         await connectDB()
//         const contentType = req.headers.get('content-type')

//         if (!contentType?.includes('multipart/form-data')) {
//             return NextResponse.json(
//                 { error: 'Invalid content type' },
//                 { status: 400 },
//             )
//         }

//         const formData = await req.formData()
//         const _id = formData.get('_id')
//         const name = formData.get('name')
//         const slug = formData.get('slug')
//         const category = formData.get('category')
//         const description = formData.get('description')
//         const existingImages = JSON.parse(
//             formData.get('existingImages') || '[]',
//         )

//         const newImages = await handleUpload(formData)
//         const finalImages = [...existingImages, ...newImages]

//         const updatedProduct = await Product.findByIdAndUpdate(
//             _id,
//             { name, slug, category, description, images: finalImages },
//             { new: true },
//         )

//         if (!updatedProduct) {
//             return NextResponse.json(
//                 { error: 'Product not found' },
//                 { status: 404 },
//             )
//         }

//         return NextResponse.json(updatedProduct)
//     } catch (err) {
//         return NextResponse.json({ error: err.message }, { status: 500 })
//     }
// }



import { NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import connectDB from '@/lib/db'
import Logo from '../../models/logo.model'

const LOGO_DIR = path.join(process.cwd(), 'public', 'uploads', 'logo')
if (!existsSync(LOGO_DIR)) {
    mkdirSync(LOGO_DIR, { recursive: true })
}

async function handleLogoUpload(file) {
    if (!file || typeof file.arrayBuffer !== 'function') return null

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = path.extname(file.name)
    const filename = `${uuidv4()}${ext}`
    const filePath = path.join(LOGO_DIR, filename)

    await writeFile(filePath, buffer)

    return {
        name: file.name,
        url: `/uploads/logo/${filename}`,
        path: filePath,
    }
}

// ✅ POST: Upload or replace the single logo
export async function POST(req) {
    try {
        await connectDB()
        const contentType = req.headers.get('content-type') || ''
        if (!contentType.includes('multipart/form-data')) {
            return NextResponse.json(
                { error: 'Invalid content type' },
                { status: 400 },
            )
        }

        const formData = await req.formData()
        const file = formData.get('file')
        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 },
            )
        }

        const newLogo = await handleLogoUpload(file)
        if (!newLogo) {
            return NextResponse.json(
                { error: 'File upload failed' },
                { status: 400 },
            )
        }

        const existing = await Logo.findOne()
        if (existing) {
            const oldPath = path.join(process.cwd(), 'public', existing.url)
            if (existsSync(oldPath)) {
                await unlink(oldPath)
            }
            await Logo.deleteOne({ _id: existing._id })
        }

        const savedLogo = await Logo.create({
            name: newLogo.name,
            url: newLogo.url,
        })
        return NextResponse.json({ logo: savedLogo }, { status: 201 })
    } catch (err) {
        console.error('POST error:', err)
        return NextResponse.json(
            { error: 'Failed to upload logo' },
            { status: 500 },
        )
    }
}

// ✅ GET: Get the single logo
export async function GET() {
    try {
        await connectDB()
        const logo = await Logo.findOne().lean()
        return NextResponse.json({ logo }, { status: 200 })
    } catch (err) {
        return NextResponse.json(
            { error: 'Failed to fetch logo' },
            { status: 500 },
        )
    }
}

// ✅ PATCH: Update the logo (image and/or name)
export async function PATCH(req) {
    try {
        await connectDB()
        const contentType = req.headers.get('content-type') || ''
        if (!contentType.includes('multipart/form-data')) {
            return NextResponse.json(
                { error: 'Invalid content type' },
                { status: 400 },
            )
        }

        const formData = await req.formData()
        const file = formData.get('file')

        const existing = await Logo.findOne()
        if (!existing) {
            return NextResponse.json(
                { error: 'No logo found to update' },
                { status: 404 },
            )
        }

        if (file) {
            const newLogo = await handleLogoUpload(file)
            if (!newLogo) {
                return NextResponse.json(
                    { error: 'File upload failed' },
                    { status: 400 },
                )
            }

            const oldPath = path.join(process.cwd(), 'public', existing.url)
            if (existsSync(oldPath)) {
                await unlink(oldPath)
            }

            existing.name = newLogo.name
            existing.url = newLogo.url
        }

        await existing.save()
        return NextResponse.json({ logo: existing }, { status: 200 })
    } catch (err) {
        console.error('PATCH error:', err)
        return NextResponse.json(
            { error: 'Failed to update logo' },
            { status: 500 },
        )
    }
}
