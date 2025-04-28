import { type } from 'express/lib/response'
import mongoose from 'mongoose'

const whyUsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        contents: [
            {
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
                title: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
                button: {
                    visible: {
                        type: Boolean,
                        default: false,
                    },
                    text: String,
                    enum: ['visit', 'contact', 'none'],
                    default: 'none',
                },
            },
        ],
    },
    { timestamps: true },
)

const WhyUs = mongoose.models.WhyUs || mongoose.model('WhyUs', whyUsSchema)
export default WhyUs