import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import {
    footerLogo,
    getAddress,
    getEmail,
    getNumber,
    getSocialMedia,
} from '@/lib/actions/dataFetch'
import Media from './(Components)/media'

const Footer = async () => {
    const logo = await footerLogo()
    console.log(logo, 'Footer Logo')

    const socialMedias = await getSocialMedia()
    const address = await getAddress()
    const phoneNumber = await getNumber()
    const email = await getEmail()

    return (
        <footer className='w-full bg-white text-black shadow-[0_-3px_5px_-2px_rgba(0,0,0,0.1)] select-none'>
            <div className='max-w-[90vw] md:max-w-[80vw] mx-auto flex flex-col md:flex-row justify-center gap-16 py-10'>
                {/* Brand Section */}
                <div className='flex flex-col items-start gap-6 flex-shrink-0 w-full md:w-auto'>
                    {logo?.url && (
                        <Image
                            src={logo.url}
                            alt={logo.name}
                            width={240}
                            height={60}
                            priority
                            className='object-cover'
                        />
                    )}
                    <p className='text-base md:text-lg font-bold'>
                        Follow us on
                    </p>
                    <div className='flex gap-4'>
                        {socialMedias?.map((media) => (
                            <Media
                                key={media._id}
                                media={media}
                            />
                        ))}
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className='flex flex-col sm:flex-row gap-10 text-base md:text-lg font-semibold w-full md:w-auto justify-start'>
                    <div className='flex flex-col gap-3'>
                        <Link
                            href='/our-products'
                            className='hover:text-blue-600'
                        >
                            Our Products
                        </Link>
                        <Link
                            href='/curtain-cost-estimator'
                            className='hover:text-blue-600'
                        >
                            Get Estimate
                        </Link>
                        <Link
                            href='/privacy-policy'
                            className='hover:text-blue-600'
                        >
                            Privacy Policy
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Link
                            href='/book-a-free-visit'
                            className='hover:text-blue-600'
                        >
                            Book A Free Visit
                        </Link>
                        <Link
                            href='/terms-&-conditions'
                            className='hover:text-blue-600'
                        >
                            Terms of use
                        </Link>
                    </div>
                </nav>

                {/* Contact Section */}
                <div className='border-t md:border-t-0 md:border-l-3 border-orange-600 pt-6 md:pt-0 md:px-8 w-full md:w-auto text-left'>
                    <p className='text-lg md:text-xl font-semibold mb-4'>
                        We are in
                    </p>
                    <div className='flex items-center gap-3 text-black mb-8'>
                        <Image
                            src='/map.svg'
                            alt='location Icon'
                            width={24}
                            height={24}
                            priority
                        />
                        <p className='text-base md:text-lg font-semibold truncate max-w-[150px]'>
                            Dubai
                        </p>
                    </div>

                    <p className='text-lg md:text-xl font-semibold mb-4'>
                        Contact Us
                    </p>

                    <div className='flex items-center gap-3 mb-4 max-w-full'>
                        <Image
                            src='/map.svg'
                            alt='location Icon'
                            width={24}
                            height={24}
                            priority
                        />
                        <p className='text-base md:text-lg font-semibold break-words max-w-[250px] md:max-w-full'>
                            {address?.address || ''}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 mb-4 max-w-full'>
                        <Image
                            src='/call.svg'
                            alt='Call Icon'
                            width={24}
                            height={24}
                            priority
                        />
                        <p className='text-base md:text-lg font-semibold break-words max-w-[250px] md:max-w-full'>
                            {phoneNumber?.phoneNumber || ''}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 mb-4 max-w-full'>
                        <FaWhatsapp size={24} className='text-green-500' />
                        <p className='text-base md:text-lg font-semibold break-words max-w-[250px] md:max-w-full'>
                            {phoneNumber?.phoneNumber || ''}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 max-w-full'>
                        <Image
                            src='/email.png'
                            alt='Email Icon'
                            width={24}
                            height={24}
                            priority
                        />
                        <p className='text-base md:text-lg font-semibold break-words max-w-[250px] md:max-w-full'>
                            {email?.email || ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className='text-center border-t border-gray-200 py-6 px-4 text-sm md:text-base font-semibold text-gray-700'>
                © {new Date().getFullYear()} Curtain Setup All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer
