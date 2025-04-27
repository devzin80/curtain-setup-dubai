import Image from 'next/image'
import React from 'react'

const WhyUs = () => {
    return (
        <div className='my-10 z-0'>
            <h1 className='text-4xl text-center font-bold text-orange-500 my-12 '>
                Why Clients Trust Us
            </h1>
            <div className='flex flex-col justify-center items-center my-14 '>
                <div className='w-[80vw] flex justify-between items-center gap-8 my-14 '>
                    <div className='w-2/4'>
                        <Image
                            src={'/content1.jpg'}
                            alt='Why we are trusted'
                            width={600}
                            height={600}
                            // fill
                            className='object-cover rounded-2xl w-full h-[450px] overflow-hidden'
                        />
                    </div>
                    <div className='text-black w-2/4 px-8 text-justify'>
                        <h1 className='text-3xl font-bold my-10'>
                            Why Choose Us for Curtains in the UAE?
                        </h1>
                        <p className='text-md'>
                            We stand out from the competition with: Exceptional
                            service quality Professional curtain experts A wide
                            range of products including premium curtains,
                            furniture, carpets, artificial grass, indoor plants,
                            SPC flooring, wall panels, and more. Our mission? To
                            make sure every customer is 100% satisfied. Choose
                            us for the best curtain solutions in the UAE.
                        </p>
                    </div>
                </div>
                <div className='w-[80vw] flex flex-row-reverse justify-between items-center gap-8 my-14'>
                    <div className='w-2/4'>
                        <Image
                            src={'/content2.jpg'}
                            alt='Why we are trusted'
                            width={600}
                            height={600}
                            // fill
                            className='object-cover rounded-2xl w-full h-[450px] overflow-hidden'
                        />
                    </div>
                    <div className='text-black w-2/4 px-8 text-justify'>
                        <h1 className='text-3xl font-bold my-10'>
                            Wide Range of Premium Curtain Fabrics & Colors
                        </h1>
                        <p className='text-base '>
                            Every space is unique—and so is your taste! We offer
                            a vast variety of premium curtain fabrics in modern,
                            classic, and luxury textures. Let us know your
                            preference, and we’ll bring a customized curtain
                            fabric catalog to your doorstep.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUs
