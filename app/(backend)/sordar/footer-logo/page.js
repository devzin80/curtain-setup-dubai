import Uploader from '@/app/(Components)/logoUploader'
import React from 'react'

const FooterLogo = () => {
  return (
    <div className='w-full py-10 '>
                <div className='text-black font-semibold p-5  max-w-3xl h-[50vh] mx-auto my-20'>
                    <Uploader apiPath={'/api/footer-logo'} />
                </div>
            </div>
  )
}

export default FooterLogo