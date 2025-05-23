import mongoose from 'mongoose'

const whyUsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    button:{
        type: String,
        enum: ['free-visit', 'price-calculator','null'],
        default: 'null',
        required: false,
    },
    image: {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
})

const WhyUs = mongoose.models.WhyUs || mongoose.model('WhyUs', whyUsSchema)
export default WhyUs
