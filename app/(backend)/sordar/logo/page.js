import React from 'react'
import Uploader from '@/app/(Components)/logoUploader'

const LogoUploader = () => {
    return (
        <div className='w-full py-10 '>
            <div className='text-black font-semibold p-5  max-w-3xl h-[50vh] mx-auto my-20'>
                <Uploader
                    apiPath={`${process.env.NEXT_PUBLIC_BASE_URL}/api/logo`}
                />
            </div>
        </div>
    )
}

export default LogoUploader
