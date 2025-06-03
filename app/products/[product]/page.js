import ProductClient from '@/app/(Components)/productClient'
import { getProduct } from '@/lib/actions/dataFetch'
import React from 'react'

const Product = async ({ params }) => {
    const { product } = await params

    const singleProduct = await getProduct(product)
    console.log('I am from single product',singleProduct)

    // return (
    //     <div>
    //         <div className='flex justify-center items-center'>
    //             <div className='w-[80vw] flex justify-between items-center gap-5 my-14'>
    //                 <div className='w-2/4'>
    //                     <Image
    //                         src={singleProduct?.images[0].url}
    //                         alt={singleProduct?.images[0].name}
    //                         width={600}
    //                         height={600}
    //                         // fill
    //                         className='object-cover rounded-2xl w-full h-[450px] overflow-hidden'
    //                     />
    //                 </div>
    //                 <div className='text-black w-2/4 px-8 text-justify'>
    //                     <h1 className='text-3xl font-bold my-8'>
    //                         {singleProduct?.name}
    //                     </h1>
    //                     <p className='text-md '>{singleProduct?.description}</p>
    //                     <Link href={'/book-a-free-visit'}>
    //                         <div className=' my-8 text-center rounded-xl border-2 px-4 py-3 bg-blue-500 mx-auto text-xl font-semibold text-white'>
    //                             Book A Free Visit
    //                         </div>
    //                     </Link>
    //                 </div>
    //             </div>
    //         </div>

    // <div className='w-[85vw] mx-auto p-6 my-8'>
    //     <h2 className='text-3xl font-bold text-center text-gray-800 mb-24'>
    //         How to Choose Curtains or Blinds
    //     </h2>
    //     <div className='flex flex-around gap-15 items-center text-xl'>
    //         {/* Step 1 */}
    //         <div className='mb-4 p-4 bg-white rounded-md shadow-2xl shadow-sky-500'>
    //             <h3 className='font-bold text-gray-700 text-center my-5'>
    //                 1. Your Product
    //             </h3>
    //             <p className='text-gray-600 text-base my-8'>
    //                 Choose between curtains or blinds based on your
    //                 preference and needs.
    //             </p>
    //         </div>

    //         {/* Step 2 */}
    //         <div className='mb-4 p-4 bg-white rounded-md shadow-2xl shadow-sky-500'>
    //             <h3 className='font-bold text-gray-700 text-center my-5'>
    //                 2. Your Fabrics
    //             </h3>
    //             <p className='text-gray-600 text-base my-8'>
    //                 Select from sheer, velvet, linen, blackout, or other
    //                 specialized fabrics.
    //             </p>
    //         </div>

    //         {/* Step 3 */}
    //         <div className='mb-4 p-4 bg-white rounded-md shadow-2xl shadow-sky-500'>
    //             <h3 className='font-bold text-gray-700 text-center my-5'>
    //                 3. That&apos;s It!
    //             </h3>
    //             <p className='text-gray-600 text-base my-8'>
    //                 Book a visit to explore styles and fabrics, and get
    //                 your curtains in 3-5 days.
    //             </p>
    //         </div>
    //     </div>

    //     {/* Call to Action */}
    //     <Link href={'/book-a-free-visit'}>
    //         <div className='max-w-xl my-12 text-center rounded-xl border-2 px-4 py-5 bg-blue-500 mx-auto text-xl font-semibold text-white '>
    //             Book A Free Visit
    //         </div>
    //     </Link>
    // </div>
    //     </div>
    // )

    if (!singleProduct) {
        return (
            <div className='text-center text-gray-500 my-10'>
                Product not found.
            </div>
        )
    }
    return <ProductClient product={singleProduct} />
}

export default Product
