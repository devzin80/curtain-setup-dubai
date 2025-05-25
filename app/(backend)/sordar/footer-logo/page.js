
import Uploader from '@/app/(Components)/footerLogoUploader'
import React from 'react'
// ;`/api/email`
const FooterLogo = () => {
  return (
      <div className='w-full py-10 '>
          <div className='text-black font-semibold p-5  max-w-3xl h-[50vh] mx-auto my-20'>
              <Uploader/>
          </div>
      </div>
  )
}

export default FooterLogo