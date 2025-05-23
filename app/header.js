import Image from 'next/image'
import React from 'react'
import Logo from '../public/urbar-logo.svg'
import Link from 'next/link'
import { getLogo } from '@/lib/actions/dataFetch'
import connectDB from '@/lib/db'

const Header = async() => {
    const logo = await getLogo()
    return (
        <div className='sticky top-0 w-full h-[12vh] bg-white text-black text-xl flex justify-center items-center shadow z-20'>
            <div className='w-3/4 flex justify-between items-center'>
                {/* Logo Div here */}

                <Link href={'/'}>
                    <div className='overflow-hidden w-[160px] h-[100px] flex justify-center items-center'>
                        <Image
                            src={logo.url}
                            alt='Website Logo'
                            width={160}
                            height={100}
                            priority
                            className='object-contain w-full h-full'
                        />
                    </div>
                </Link>

                {/* Navigation Here */}

                <div className='flex justify-between items-center text-xl text-black text-center gap-10 font-semibold'>
                    <Link href={'/our-products'}>Our Products</Link>
                    <Link href={'/curtain-cost-estimator'}>Get Estimate</Link>
                    <Link href={'/book-a-free-visit'}>
                        <div className='border-blue-400 rounded-xl border-2 px-4 py-2.5 text-blue-400'>
                            Book A Free Visit
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
