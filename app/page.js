import connectDB from '@/lib/db'
import AdditionalProducts from './(Components)/additionalProducts'
import BestSellingProducts from './(Components)/bestSelling'
import Hero from './(Components)/hero'
import WhyUs from './(Components)/whyUs'
import BookAFreeVisit from './book-a-free-visit/page'
import { get } from 'mongoose'
import { getSeoData } from '@/lib/seodata'


export async function generateMetadata() {
    return getSeoData({ page: '/' })
}
export default function Home() {
    return (
        <div>
            <Hero />
            <WhyUs />
            <BestSellingProducts title='Elegance in Demand' />
            <AdditionalProducts />
            <BookAFreeVisit />
        </div>
    )
}
