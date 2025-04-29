import mongoose from "mongoose";
const phoneSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
});
const Phone = mongoose.models.Phone || mongoose.model("Phone", phoneSchema);
export default Phone;
