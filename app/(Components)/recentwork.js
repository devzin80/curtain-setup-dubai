import Image from 'next/image'
import React from 'react'

const RecentWorks = ({ work }) => {
    return (
        <div className='bg-white rounded-xl shadow-md overflow-hidden p-0'>
            <div className='relative group'>
                <Image
                    src={work?.image.url}
                    alt={work?.image.name}
                    width={800}
                    height={600}
                    priority
                    className='w-full h-60 sm:h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3'>
                    <span className='text-white text-lg font-semibold flex items-center gap-2 drop-shadow'>
                        <span
                            role='img'
                            aria-label='location'
                        >
                            📍
                        </span>
                        {work?.location}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RecentWorks
