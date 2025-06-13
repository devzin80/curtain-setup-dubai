import ProductClient from '@/app/(Components)/productClient'
import { getProduct } from '@/lib/actions/dataFetch'
import { getSeoData } from '@/lib/seodata'
import React from 'react'
export async function generateMetadata({params}) {
    const { product } = await params
    const path = `products/${product}`
    //  console.log(product, 'product in generateMetadata')
    return getSeoData({ page: path })
}
const Product = async ({ params }) => {
    const { product } = await params
    

    const singleProduct = await getProduct(product)
    

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
