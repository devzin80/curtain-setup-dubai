'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductClient = ({ product }) => {
    // Use optional chaining and fallback for robustness
    const [mainImage, setMainImage] = useState(
        product.images?.[0] || { url: '/placeholder.png', name: 'No Image' },
    )

    return (
        <div className='w-full'>
            <div className='flex justify-center items-center mt-16'>
                <div className='w-[90vw] max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-10'>
                    {/* Main Image & Thumbnails */}
                    <div className='w-full lg:w-1/2'>
                        <Image
                            src={mainImage.url}
                            alt={mainImage.name || product.name}
                            width={600}
                            height={600}
                            className='object-cover rounded-xl w-full h-[400px] sm:h-[500px] lg:h-[450px]'
                        />
                        <div className='flex gap-3 flex-wrap justify-center mt-4'>
                            {(product.images?.length
                                ? product.images
                                : [
                                      {
                                          url: '/placeholder.png',
                                          name: 'No Image',
                                      },
                                  ]
                            ).map((img, idx) => (
                                <button
                                    key={img.url || idx}
                                    onClick={() => setMainImage(img)}
                                    className={`border-2 rounded-md overflow-hidden w-[70px] h-[70px] ${
                                        mainImage.url === img.url
                                            ? 'border-blue-500'
                                            : 'border-gray-300'
                                    }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.name || product.name}
                                        width={70}
                                        height={70}
                                        className='object-cover w-full h-full'
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className='text-black w-full lg:w-1/2 px-4'>
                        <h1 className='text-3xl sm:text-4xl font-bold my-6'>
                            {product.name}
                        </h1>
                        <p className='text-base sm:text-lg text-justify'>
                            {product.description}
                        </p>
                        <Link href='/book-a-free-visit'>
                            <div className='mt-8 text-center rounded-xl border-2 px-4 py-3 bg-blue-500 text-white font-semibold text-lg sm:text-xl'>
                                Book A Free Visit
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* HOW TO CHOOSE SECTION */}
            <div className='w-[90vw] mx-auto p-4 sm:p-6 my-8'>
                <h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12 sm:mb-24'>
                    How to Choose Curtains or Blinds
                </h2>

                <div className='flex flex-wrap justify-center gap-6 text-base sm:text-xl'>
                    {/* Step 1 */}
                    <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] mb-4 p-4 bg-white rounded-md shadow-2xl shadow-sky-500'>
                        <h3 className='font-bold text-gray-700 text-center my-5'>
                            1. Your Product
                        </h3>
                        <p className='text-gray-600 my-4'>
                            Choose between curtains or blinds based on your
                            preference and needs.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] mb-4 p-4 bg-white rounded-md shadow-2xl shadow-sky-500'>
                        <h3 className='font-bold text-gray-700 text-center my-5'>
                            2. Your Fabrics
                        </h3>
                        <p className='text-gray-600 my-4'>
                            Select from sheer, velvet, linen, blackout, or other
                            specialized fabrics.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] mb-4 p-4 bg-white rounded-md shadow-2xl shadow-sky-500'>
                        <h3 className='font-bold text-gray-700 text-center my-5'>
                            3. That&apos;s It!
                        </h3>
                        <p className='text-gray-600 my-4'>
                            Book a visit to explore styles and fabrics, and get
                            your curtains in 3-5 days.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <Link href='/book-a-free-visit'>
                    <div className='max-w-sm sm:max-w-xl my-12 text-center rounded-xl border-2 px-4 py-5 bg-blue-500 mx-auto text-lg sm:text-xl font-semibold text-white'>
                        Book A Free Visit
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductClient
