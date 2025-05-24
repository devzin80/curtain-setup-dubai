// import { getWhyUs } from '@/lib/actions/dataFetch'
// import React from 'react'
// import Content from './whyUsContent'

// const WhyUs = async () => {
//     const contents = await getWhyUs()
    
    
    

//     return (
//         <div className='my-10 z-0'>
//             <h1 className='text-4xl text-center font-bold text-blue mt-24 mb-10 '>
//                 Why We Are Trusted
//             </h1>
//             <div className='flex flex-col justify-center items-center my-5 '>
//                 {
//                     contents?.map((content, index) => {
//                         return <Content key={index} content={content} index={index} />
//                     })                }
//             </div>
//         </div>
//     )
// }

// export default WhyUs


import { getWhyUs } from '@/lib/actions/dataFetch'
import React from 'react'
import Content from './whyUsContent'

const WhyUs = async () => {
    const contents = await getWhyUs()

    return (
        <section className='my-10 px-4 md:px-8'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl text-center font-bold text-blue-700 mt-16 mb-10'>
                Why We Are Trusted
            </h1>
            <div className='flex flex-col gap-16 items-center'>
                {contents?.map((content, index) => (
                    <Content
                        key={index}
                        content={content}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}

export default WhyUs
