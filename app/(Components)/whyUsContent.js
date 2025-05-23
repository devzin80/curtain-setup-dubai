import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Content = ({ content, index }) => {
    return (
        <div>
            <div
                className={`w-[80vw] flex justify-between items-center gap-8 my-14 ${
                    !index % 2 == 0 ? 'flex-row-reverse' : ''
                }`}
            >
                <div className='w-2/4'>
                    <Image
                        src={content.image.url}
                        alt={content.image.name}
                        width={600}
                        height={600}
                        // fill
                        className='object-cover rounded-2xl w-full h-[450px] overflow-hidden'
                    />
                </div>
                <div className='text-black w-2/4 px-8 text-justify'>
                    <h1 className='text-3xl font-bold my-10'>
                        {content.title}
                    </h1>
                    <p className='text-md'>{content.description}</p>
                </div>
            </div>
            {!content.button ? (
                <Link
                    href={`${
                        content.button === 'free-visit'
                            ? '/book-a-free-visit'
                            : '/curtain-cost-estimator'
                    }`}
                >
                    <div className='border-blue-400 rounded-xl border-2 px-4 py-2.5 text-blue-400'>
                        {content.button === 'free-visit'
                            ? 'Book A Free Visit'
                            : 'Get Estimate'}
                    </div>
                </Link>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Content
