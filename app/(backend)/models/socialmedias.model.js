import mongoose from 'mongoose'

const socialMediaSchema = new mongoose.Schema({
    medias: [
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
})
const SocialMedia =
    mongoose.models.SocialMedia ||
    mongoose.model('SocialMedia', socialMediaSchema)
export default SocialMedia
