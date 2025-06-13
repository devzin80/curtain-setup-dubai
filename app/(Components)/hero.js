import { bannerVideo } from '@/lib/actions/dataFetch'
import React from 'react'

const Hero = async () => {
    const video = await bannerVideo()
    // console.log('Banner Video:', video)

    return (
        <div className='w-auto max-h-[680px] relative overflow-hidden'>
            {video?.url && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='w-full h-full object-cover rounded'
                    controls={false}
                    disablePictureInPicture
                    controlsList='nodownload nofullscreen noremoteplayback'
                >
                    <source
                        src={video.url}
                        type='video/mp4'
                    />
                    <source
                        src={video.url}
                        type='video/webm'
                    />
                    <source
                        src={video.url}
                        type='video/ogg'
                    />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    )
}

export default Hero
