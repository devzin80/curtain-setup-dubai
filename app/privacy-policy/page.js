import React from 'react'
import DOMPurify from 'dompurify'
import connectDB from '@/lib/db'
import Privacy from '@/app/(backend)/models/privacy.model'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const purify = DOMPurify(window)

const PrivacyPolicy = async () => {


    await connectDB()
    const privacy = await Privacy.find().lean()


    return (
        <div className='flex justify-center items-center'>
            <div className='w-3/4 my-10'>
                <article
                    dangerouslySetInnerHTML={{
                        __html: purify.sanitize(privacy[0].content),
                    }}
                />
            </div>
        </div>
    )
}

export default PrivacyPolicy
