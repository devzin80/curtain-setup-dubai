import React from 'react'
import BookAVisitForm from '../(Components)/visit'
import { getSeoData } from '@/lib/seodata'
export async function generateMetadata() {
    return getSeoData({ page: 'book-a-free-visit' })
}
const BookAFreeVisit = () => {
    return (
        // <div>BookAFreeVisit</div>
        <div className=''>
            <BookAVisitForm />
        </div>
    )
}

export default BookAFreeVisit
