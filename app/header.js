import Image from 'next/image'
import React from 'react'
import Logo from '../public/urbar-logo.svg'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='sticky w-full h-[12vh] bg-white text-black text-xl flex justify-center items-center'>
            <div className='w-3/4 flex justify-between items-center'>
                {/* Logo Div here */}

                <Link href={'/'}>
                    <div>
                        <Image
                            src={Logo}
                            alt='Website Logo'
                            height={95}
                        />
                    </div>
                </Link>

                {/* Navigation Here */}

                <div className='flex justify-between items-center text-xl text-black text-center gap-10 font-semibold'>
                    <Link href={'/products'}>Our Products</Link>
                    <Link href={'/cost-estimator'}>Get Estimate</Link>
                    <Link href={'/about-us'}>About Us</Link>
                    <Link href={'/help'}>Help</Link>
                    <Link href={'/free-visit'}>
                        <div className='border-blue-600 rounded-xl border-2 px-4 py-2.5 text-blue-600'>
                            Book A Free Visit
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
