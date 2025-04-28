import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        visible: {
            type: Boolean,
            default: false,
        },
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
        },
    },
    { timestamps: true },
)

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)
export default Review
