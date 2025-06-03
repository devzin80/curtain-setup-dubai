import React from 'react'
import Uploader from '@/app/(Components)/logoUploader'

const LogoUploader = () => {
    return (
        <div className='w-full py-10 px-4 sm:px-6 md:px-8'>
            <div className='text-black font-semibold mx-auto max-w-3xl w-full min-h-[50vh] flex items-center justify-center bg-white shadow-sm rounded-md p-4 sm:p-6 md:p-8'>
                <Uploader />
            </div>
        </div>
    )
}

export default LogoUploader
