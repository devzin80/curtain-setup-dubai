import { type } from 'express/lib/response'
import mongoose from 'mongoose'

const footerSchema = new mongoose.Schema({
    logo: {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    socialLinks: [
        {
            name: {
                type: String,
                required: true,
            },
            logo: {
                name: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    privacyPolicy: {
        type: String,
    },
    terms: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})
const Footer = mongoose.models.Footer || mongoose.model('Footer', footerSchema)
export default Footer
