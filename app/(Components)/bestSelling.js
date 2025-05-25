// import { getProducts } from '@/lib/actions/dataFetch'
// import React from 'react'
// import Product from './product'

// const BestSellingProducts = async ({title}) => {
//     const products = await getProducts('curtains')

//     return (
//         <div className='py-10 '>
//             <h1 className='font-bold text-3xl text-black my-10 text-center'>
//                 {title}
//             </h1>
//             <div className=' flex justify-center items-center'>
//                 <div className='w-[80vw] flex justify-start items-center gap-12 my-12 flex-wrap'>
//                     {products?.map((product, index) => {
//                         return (
//                             <div key={index}>
//                                 <Product
//                                     name={product.name}
//                                     images={product.images}
//                                     slug={product.slug}
//                                 />
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BestSellingProducts

import { getProducts } from '@/lib/actions/dataFetch'
import React from 'react'
import Product from './product'

const BestSellingProducts = async ({ title }) => {
    const products = await getProducts('curtains')

    return (
        <div className='py-10'>
            <h1 className='font-bold text-3xl text-black my-10 text-center'>
                {title}
            </h1>

            <div className='flex justify-center'>
                <div className='w-[80vw] flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-12'>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product, index) => (
                            <Product
                                key={product._id || product.slug || index}
                                name={product.name || ''}
                                images={product.images || []}
                                slug={product.slug || ''}
                            />
                        ))
                    ) : (
                        <div>No products found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BestSellingProducts
