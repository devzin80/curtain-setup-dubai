import Uploader from '@/app/(Components)/videoUploader'
import React from 'react'

const HeroBannerVideo = () => {
    return <div className='text-black font-semibold p-5  max-w-3xl h-[50vh] mx-auto my-20'>
                    <Uploader apiPath={'/api/banner-video'} />
                </div>
}

export default HeroBannerVideo
