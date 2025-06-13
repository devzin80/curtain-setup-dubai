import AdditionalProducts from './(Components)/additionalProducts'
import BestSellingProducts from './(Components)/bestSelling'
import Hero from './(Components)/hero'
import WhatsAppFloatingButton from './(Components)/whatsapp'
import WhyUs from './(Components)/whyUs'
import BookAFreeVisit from './book-a-free-visit/page'

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
