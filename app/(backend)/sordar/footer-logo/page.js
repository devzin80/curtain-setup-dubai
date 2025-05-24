import Uploader from '@/app/(Components)/logoUploader'
import React from 'react'
// ;`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`
const FooterLogo = () => {
  return (
      <div className='w-full py-10 '>
          <div className='text-black font-semibold p-5  max-w-3xl h-[50vh] mx-auto my-20'>
              <Uploader
                  apiPath={
                     ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/footer-logo`
                  }
              />
          </div>
      </div>
  )
}

export default FooterLogo