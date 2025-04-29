import mongoose from 'mongoose';
const logoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const FooterLogo =
    mongoose.models.FooterLogo || mongoose.model('FooterLogo', logoSchema)
export default FooterLogo
