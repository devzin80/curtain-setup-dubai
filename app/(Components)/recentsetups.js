import { getRecentWorks } from '@/lib/actions/dataFetch'

import React from 'react'
import RecentWorks from './recentwork'

const RecentSetups = async () => {
    const works = await getRecentWorks()
    return (
        <section className='px-4 py-12 bg-white max-w-7xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-center text-orange-600 mb-10'>
                Our Recent Work
            </h2>

            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                {works && works.length > 0 ? (
                    works.map((work, index) => (
                        <RecentWorks
                            key={index}
                            work={work}
                        />
                    ))
                ) : (
                    <div className='text-center text-gray-500 text-lg col-span-full'>
                        No recent setups found.
                    </div>
                )}
            </div>
        </section>
    )
}

export default RecentSetups
