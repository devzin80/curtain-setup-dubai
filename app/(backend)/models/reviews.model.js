import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
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
    },
    { timestamps: true },
)

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)
export default Review
