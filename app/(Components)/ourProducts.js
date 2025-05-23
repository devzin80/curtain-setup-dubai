import Image from 'next/image'
import React from 'react'

const OurProducts = ({product}) => {
  return (
      <div>
          <div
              
              className='relative rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300'
          >
              <Image
                  src={product.image.url}
                  alt={product.image.name}
                  width={500}
                  height={300}
                  className='w-full h-72 object-cover'
              />
              <div className='absolute inset-0 bg-[#4f4f503d]  p-6 flex flex-col justify-end text-white  '>
                  <h3 className='text-2xl font-bold mb-2 cursor-pointer'>
                      {product.title} &rsaquo;
                  </h3>
                  <p className='text-sm leading-relaxed'>{product.description}</p>
              </div>
          </div>
      </div>
  )
}

export default OurProducts 