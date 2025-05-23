const mongoose = require('mongoose')
const { Schema } = mongoose

const VariantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        factor: {
            type: Number,
            required: true,
        },
        // Add more fields if needed like SKU, stock, etc.
    },
    { _id: false },
)

const calculatorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hasVariants: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: function () {
            return !this.hasVariants
        },
    },
    factor: {
        type: Number,
        required: function () {
            return !this.hasVariants
        },
    },
    variants: {
        type: [VariantSchema],
        validate: {
            validator: function (v) {
                if (this.hasVariants) {
                    return Array.isArray(v) && v.length > 0
                } else {
                    return v.length === 0
                }
            },
            message: (props) =>
                `Variants array is invalid based on hasVariants`,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Calculator =
    mongoose.models.Calculator || mongoose.model('Calculator', calculatorSchema)
export default Calculator
