import SEO from "@/app/(backend)/models/seo.model"
import connectDB from "./db"

export async function getSeoData({page}) {
    await connectDB()
    try {
        const seo = await SEO.findOne({ page })
        console.log(seo);
        
        if (seo) {
            return seo
        }
        return {
            title: 'Curtain Setup',
            description:
                'An authentic, reliable and cost-friendly website for buying curtains ',
        }
    } catch (e) {
        console.log(e);
        
        
    }
}