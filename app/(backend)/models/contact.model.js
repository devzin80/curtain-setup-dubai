import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;