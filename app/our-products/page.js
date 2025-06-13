import { getOurProducts } from '@/lib/actions/dataFetch'
import React from 'react'
import OurProducts from '../(Components)/ourProducts'
import BestSellingProducts from '../(Components)/bestSelling'
import { getSeoData } from '@/lib/seodata'

export async function generateMetadata() {
    return getSeoData({ page: 'our-products' })
}
const Product = async () => {
    const ourProducts = await getOurProducts()

    return (
        <div>
            <div className='bg-[#f9f6f3] py-12 px-4 md:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto'>
                    {ourProducts.length === 0 && (
                        <div className='col-span-full text-center text-gray-500'>
                            No products found.
                        </div>
                    )}
                    {ourProducts.map((product, index) => {
                        return (
                            <OurProducts
                                key={index}
                                product={product}
                            />
                        )
                    })}
                </div>
                <BestSellingProducts title='Best Selling Products' />
            </div>
        </div>
    )
}

export default Product
