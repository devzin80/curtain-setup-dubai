import React from 'react'
import DOMPurify from 'dompurify'
import connectDB from '@/lib/db'
import Privacy from '@/app/(backend)/models/privacy.model'
import { JSDOM } from 'jsdom'
import { getSeoData } from '@/lib/seodata'

const window = new JSDOM('').window
const purify = DOMPurify(window)
export async function generateMetadata() {
    return getSeoData({ page: 'privacy-policy' })
}
const PrivacyPolicy = async () => {
    await connectDB()
    const privacy = await Privacy.find().lean()

    const content = privacy[0]?.content || '<p>No privacy policy found.</p>'

    return (
        <div className='flex justify-center items-center'>
            <div className='w-3/4 my-10'>
                <article
                    dangerouslySetInnerHTML={{
                        __html: purify.sanitize(content),
                    }}
                />
            </div>
        </div>
    )
}

export default PrivacyPolicy
