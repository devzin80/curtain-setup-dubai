import mongoose from "mongoose";

const bestSellerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
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
    }
});

const BestSeller = mongoose.models.BestSeller || mongoose.model("BestSeller", bestSellerSchema);
export default BestSeller;