import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BestSellingProducts = () => {
    return (
        <div className='py-10 bg-sky-50'>
            <h1 className='font-bold text-3xl text-black my-10 text-center'>
                Shop Our Bestsellers
            </h1>
            <div className=' flex justify-center items-center'>
                <div className='w-[80vw] flex justify-around items-center gap-2 my-12 flex-wrap'>
                    <div className=' max-w-[280px] rounded-xl overflow-hidden shadow bg-white'>
                        <div className='mb-1'>
                            <Image
                                src={'/content1.jpg'}
                                alt='Why we are trusted'
                                width={300}
                                height={300}
                                // fill
                                className='object-cover w-full h-[180px] overflow-hidden'
                            />
                        </div>
                        <Link href={'/product'}>
                            <div className='px-5 py-3 bg-white min-h-[80px]'>
                                <h1 className='text-2xl font-bold text-center'>
                                    Sheer Curtains
                                </h1>

                            </div>
                        </Link>
                    </div>
                    <div className=' max-w-[280px] rounded-xl overflow-hidden shadow bg-white'>
                        <div className='mb-1'>
                            <Image
                                src={'/content1.jpg'}
                                alt='Why we are trusted'
                                width={300}
                                height={300}
                                // fill
                                className='object-cover w-full h-[180px] overflow-hidden'
                            />
                        </div>
                        <div className='px-5 py-3 bg-white min-h-[120px]'>
                            <h1 className='text-2xl font-bold text-center underline'>
                                Sheer Curtains
                            </h1>
                            <div className='flex justify-center items-center gap-1.5 mt-8 mb-2'>
                                <p className='text-sm text-center font-semibold'>
                                    From
                                </p>
                                <p className='text-sm text-center font-bold text-orange-500 '>
                                    50 AUD
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' max-w-[280px] rounded-xl overflow-hidden shadow bg-white'>
                        <div className='mb-1'>
                            <Image
                                src={'/content1.jpg'}
                                alt='Why we are trusted'
                                width={300}
                                height={300}
                                // fill
                                className='object-cover w-full h-[180px] overflow-hidden'
                            />
                        </div>
                        <div className='px-5 py-3 bg-white min-h-[120px]'>
                            <h1 className='text-2xl font-bold text-center underline'>
                                Sheer Curtains
                            </h1>
                            <div className='flex justify-center items-center gap-1.5 mt-8 mb-2'>
                                <p className='text-sm text-center font-semibold'>
                                    From
                                </p>
                                <p className='text-sm text-center font-bold text-orange-500 '>
                                    50 AUD
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' max-w-[280px] rounded-xl overflow-hidden shadow bg-white'>
                        <div className='mb-1'>
                            <Image
                                src={'/content1.jpg'}
                                alt='Why we are trusted'
                                width={300}
                                height={300}
                                // fill
                                className='object-cover w-full h-[180px] overflow-hidden'
                            />
                        </div>
                        <div className='px-5 py-3 bg-white min-h-[120px]'>
                            <h1 className='text-2xl font-bold text-center underline'>
                                Sheer Curtains
                            </h1>
                            <div className='flex justify-center items-center gap-1.5 mt-8 mb-2'>
                                <p className='text-sm text-center font-semibold'>
                                    From
                                </p>
                                <p className='text-sm text-center font-bold text-orange-500 '>
                                    50 AUD
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestSellingProducts
