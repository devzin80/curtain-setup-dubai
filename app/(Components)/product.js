// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Product = ({name, images, slug}) => {
//   return (
//     <div className=' max-w-[280px] rounded-xl overflow-hidden shadow bg-white'>
//                             <div className='mb-1'>
//                                 <Image
//                                     src={images[0].url}
//                                     alt={images[0].name}
//                                     width={300}
//                                     height={300}
//                                     // fill
//                                     className='object-cover w-full h-[180px] overflow-hidden'
//                                 />
//                             </div>
//                             <Link href={`/products/${slug}`}>
//                                 <div className='px-5 py-3 bg-white min-h-[80px]'>
//                                     <h1 className='text-2xl font-bold text-center'>
//                                         {name}
//                                     </h1>
    
//                                 </div>
//                             </Link>
//                         </div>
//   )
// }

// export default Product

'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({ name, images, slug }) => {
    return (
        <div className='w-full max-w-xs rounded-2xl overflow-hidden shadow-md bg-white transition hover:shadow-xl duration-300 ease-in-out'>
            <Link href={`/products/${slug}`}>
                <div className='relative aspect-[4/3]'>
                    <Image
                        src={images[0].url}
                        alt={images[0].name}
                        fill
                        className='object-cover w-full h-full'
                    />
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
