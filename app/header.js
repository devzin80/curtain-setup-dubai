import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { getLogo } from '@/lib/actions/dataFetch'
import MobileNav from './(Components)/mobileNav'

const Header = async () => {
    const logo = await getLogo()
    return (
        <header className='sticky top-0 w-full h-[12vh] bg-white text-black text-xl flex justify-center items-center shadow z-20'>
            <div className='w-11/12 max-w-7xl mx-auto h-full flex justify-between items-center'>
                {/* Logo Div here */}

                <Link href={'/'}>
                    <div className='overflow-hidden w-[200px] h-[60px] flex justify-center items-center'>
                        <Image
                            src={logo.url || ''}
                            alt='Website Logo'
                            width={200}
                            height={60}
                            priority
                            className='object-contain w-full h-full'
                        />
                    </div>
                </Link>

                {/* Navigation Here */}

                <nav className='hidden md:flex items-center gap-10 text-xl font-semibold'>
                    <Link href={'/our-products'}>Our Products</Link>
                    <Link href={'/curtain-cost-estimator'}>Get Estimate</Link>
                    <Link href={'/book-a-free-visit'}>
                        <div className='border-blue-400 rounded-xl border-2 px-4 py-2.5 text-blue-400'>
                            Book A Free Visit
                        </div>
                    </Link>
                </nav>
                <MobileNav />
            </div>
        </header>
    )
}

export default Header
