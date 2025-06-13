// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Content = ({ content, index }) => {
//     return (
//         <div>
//             <div
//                 className={`w-[80vw] flex justify-between items-center gap-8 my-14 ${
//                     !index % 2 == 0 ? 'flex-row-reverse' : ''
//                 }`}
//             >
//                 <div className='w-2/4'>
//                     <Image
//                         src={content.image.url}
//                         alt={content.image.name}
//                         width={600}
//                         height={600}
//                         // fill
//                         className='object-cover rounded-2xl w-full h-[450px] overflow-hidden'
//                     />
//                 </div>
//                 <div className='text-black w-2/4 px-8 text-justify'>
//                     <h1 className='text-3xl font-bold my-10'>
//                         {content.title}
//                     </h1>
//                     <p className='text-md'>{content.description}</p>
//                 </div>
//             </div>
//             {!content.button ? (
//                 <Link
//                     href={`${
//                         content.button === 'free-visit'
//                             ? '/book-a-free-visit'
//                             : '/curtain-cost-estimator'
//                     }`}
//                 >
//                     <div className='border-blue-400 rounded-xl border-2 px-4 py-2.5 text-blue-400'>
//                         {content.button === 'free-visit'
//                             ? 'Book A Free Visit'
//                             : 'Get Estimate'}
//                     </div>
//                 </Link>
//             ) : (
//                 <></>
//             )}
//         </div>
//     )
// }

// export default Content

'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Content = ({ content, index }) => {
    const isReversed = index % 2 !== 0
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const yImage = useTransform(scrollYProgress, [0, 1], ['-20px', '20px'])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className='w-full max-w-6xl mx-auto px-2 sm:px-4'
        >
            <div
                className={`flex flex-col md:flex-row gap-8 items-center ${
                    isReversed ? 'md:flex-row-reverse' : ''
                }`}
            >
                <motion.div
                    style={{ y: yImage }}
                    className='w-full md:w-1/2'
                >
                    {content.image?.url && (
                        <Image
                            src={content.image.url}
                            alt={content.image.name || 'Why Us Image'}
                            width={600}
                            height={500} // exact 6:5 ratio
                            className='object-cover rounded-2xl w-full aspect-[6/5]'
                        />
                    )}
                </motion.div>
                <div className='w-full md:w-1/2 text-left px-2 md:px-6'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold text-[#FF6F52] mb-4'>
                        {content.title}
                    </h2>
                    <p className='text-sm sm:text-base md:text-lg text-gray-700 mb-6 text-justify'>
                        {content.description}
                    </p>

                    {(content.button === 'free-visit' ||
                        content.button === 'price-calculator') && (
                        <Link
                            href={
                                content.button === 'free-visit'
                                    ? '/book-a-free-visit'
                                    : '/curtain-cost-estimator'
                            }
                        >
                            <div className=' px-4 py-3 rounded text-white bg-orange-600 inline-block text-sm sm:text-base font-medium'>
                                {content.button === 'free-visit'
                                    ? 'Book A Free Visit'
                                    : 'Get Estimate'}
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Content
