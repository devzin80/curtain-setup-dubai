import React from 'react'
import Uploader from '@/app/(Components)/logoUploader'

const LogoUploader = () => {
    return (
        <div className='w-full py-10 '>
            <div className='text-black font-semibold p-5  max-w-3xl h-[50vh] mx-auto my-20'>
                <Uploader />
            </div>
        </div>
    )
}

export default LogoUploader
