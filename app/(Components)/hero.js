import React from 'react'

const Hero = () => {
    return (
        <div className='w-auto max-h-[680px] relative overflow-hidden'>
            <video
                className='h-full w-full object-cover overflow-hidden'
                autoPlay
                muted
                loop
                playsInline
            >
                <source
                    src='/curtain.mp4'
                    type='video/mp4'
                />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Hero
