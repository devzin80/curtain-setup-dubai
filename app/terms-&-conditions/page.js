import React from 'react'
import DOMPurify from 'dompurify'
import connectDB from '@/lib/db'
import Terms from '@/app/(backend)/models/terms.model'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const purify = DOMPurify(window)

const TermsAndConditions = async () => {
    await connectDB()
    const terms = await Terms.find().lean()

    return (
        <div className='flex justify-center items-center'>
            <div className='w-3/4 my-10'>
                <article
                    dangerouslySetInnerHTML={{
                        __html: purify.sanitize(
                            terms[0]?.content ||
                                '<p>No terms and conditions found.</p>',
                        ),
                    }}
                />
            </div>
        </div>
    )
}

export default TermsAndConditions
