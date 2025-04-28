import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
    images: [
        {
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;