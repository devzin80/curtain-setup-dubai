import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Media = ({ media }) => {
    return (
        <Link
            href={media.url}
            target='_blank'
            rel='noopener noreferrer'
        >
            <Image
                src={media.logo?.url || '/placeholder.png'}
                alt={media.name}
                width={48}
                height={48}
                priority
            />
        </Link>
    )
}

export default Media
