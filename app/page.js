import AdditionalProducts from './(Components)/additionalProducts'
import BestSellingProducts from './(Components)/bestSelling'
import Hero from './(Components)/hero'
import WhyUs from './(Components)/whyUs'

export default function Home() {
    return (
        <div>
            <Hero />
            <WhyUs />
            <BestSellingProducts title='Elegance in Demand' />
            <AdditionalProducts />
        </div>
    )
}
