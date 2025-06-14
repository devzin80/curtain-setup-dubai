import Image from 'next/image'
import React from 'react'
import Product from './product'
import { getProducts } from '@/lib/actions/dataFetch'

const AdditionalProducts = async () => {
    const products = await getProducts('others')

    return (
        <div className='py-10 '>
            <h1 className='font-bold text-3xl text-black my-10 text-center'>
                Elevate Every Corner
            </h1>
            <div className='flex justify-center'>
                <div className='w-[80vw] flex flex-wrap justify-center gap-6 sm:gap-12'>
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
                        <div>No additional products found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdditionalProducts
