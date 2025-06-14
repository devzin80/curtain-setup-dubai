'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({ name, images, slug }) => {
    const hasImage =
        Array.isArray(images) && images.length > 0 && images[0]?.url

    return (
        <div className='w-full max-w-xs rounded-2xl overflow-hidden shadow-md bg-white transition hover:shadow-xl duration-300 ease-in-out'>
            <Link href={`/products/${slug}`}>
                <div className='relative aspect-[4/3]'>
                    {hasImage ? (
                        <Image
                            src={images[0].url}
                            alt={images[0].name || name || 'Product Image'}
                            fill
                            priority
                            className='object-cover w-full h-full'
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-100 text-gray-400'>
                            No Image
                        </div>
                    )}
                </div>
                <div className='p-4 text-center'>
                    <h2 className='text-lg sm:text-xl font-semibold text-gray-800 break-words'>
                        {name}
                    </h2>
                </div>
            </Link>
        </div>
    )
}

export default Product
