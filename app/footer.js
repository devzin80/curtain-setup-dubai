import Image from 'next/image'
import React from 'react'
import Banner from '../public/urbar-logo.svg'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='w-full text-black text-xl flex flex-col justify-center items-center shadow-[0_-3px_5px_-2px_rgba(0,0,0,0.1)] '>
            <div className='flex justify-center items-center pt-4'>
                <div className='w-[80vw] h-auto flex justify-between my-10'>
                    {/* Brand here */}
                    <div className='mr-30'>
                        <Image
                            src={Banner}
                            alt='Urban Interior Brand Logo'
                            height={200}
                        />
                        <div className='ml-10'>
                            <p className='text-2xl text-black-700 font-bold text-nowrap'>
                                Follow us on
                            </p>
                            <div className='text-black flex gap-1 mt-2'>
                                <Link
                                    href={'https://facebook.com'}
                                    target='_blank'
                                >
                                    <Image
                                        src={'facebook.svg'}
                                        alt={'facebook page link'}
                                        width={48}
                                        height={48}
                                    />
                                </Link>
                                <Link
                                    href={'/'}
                                    target='_blank'
                                >
                                    <Image
                                        src={'instagram.svg'}
                                        alt={'Instagram page link'}
                                        width={48}
                                        height={48}
                                    />
                                </Link>
                                <Link
                                    href={'/'}
                                    target='_blank'
                                >
                                    <Image
                                        src={'whatsapp.svg'}
                                        alt={'whatsapp link'}
                                        width={48}
                                        height={48}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer Navigation */}

                    <div className=' text-nowrap px-7 mr-5 mt-5 flex gap-10 justify-between text-black'>
                        <div className='flex flex-col font-semibold gap-2'>
                            <Link href={'/products'}>Our Products</Link>
                            <Link href={'/curtain-cost-estimator'}>
                                Get Estimate
                            </Link>
                            
                            <Link href={'/privacy-policy'}>Privacy Policy</Link>
                        </div>
                        <div className='flex flex-col font-semibold gap-2'>
                            
                            <Link href={'/book-a-free-visit'}>
                                Book A Free Visit
                            </Link>
                            <Link href={'/terms-&-conditions'}>
                                Terms of use
                            </Link>
                        </div>
                    </div>

                    {/* Contact section */}

                    <div className='border-l-3 border-l-green-600 px-8 '>
                        <div>
                            <p className='text-xl font-bold mt-4'>We are in</p>
                            <div className='flex gap-2 mt-5'>
                                <Image
                                    src={'map.svg'}
                                    alt={'location Icon'}
                                    width={24}
                                    height={24}
                                />
                                <p className='text-xl font-semibold text-black'>
                                    Dubai
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className='text-xl font-bold mt-5'>Contact Us</p>
                            <div className='flex gap-2 mt-5 mb-8'>
                                <Image
                                    src={'map.svg'}
                                    alt={'location Icon'}
                                    width={24}
                                    height={24}
                                />
                                <p className='text-xl font-semibold text-black'>
                                    International city,Dubai,UAE
                                </p>
                            </div>
                            <div className='flex gap-2 my-5'>
                                <Image
                                    src={'call.svg'}
                                    alt={'Call Icon'}
                                    width={24}
                                    height={24}
                                />
                                <p className='text-xl font-semibold text-black'>
                                    0544985661
                                </p>
                            </div>
                            <div className='flex gap-2 my-5'>
                                <Image
                                    src={'whatsapp.svg'}
                                    alt={'Whatsapp Icon'}
                                    width={24}
                                    height={24}
                                />
                                <p className='text-xl font-semibold text-black'>
                                    0544985661
                                </p>
                            </div>
                            <div className='flex gap-2 my-5'>
                                <Image
                                    src={'/email.png'}
                                    alt={'Email Icon'}
                                    width={24}
                                    height={24}
                                />
                                <p className='text-xl text-wrap font-semibold text-black'>
                                    urbaninteriorsdubaioffical@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Copyright here */}
            <div>
                <p className='text-black font-semibold text-xl my-5'>
                    `Copyright © {new Date().getFullYear()} Urban Interiors
                    Dubai All Rights Reserved`
                </p>
            </div>
        </div>
    )
}

export default Footer
