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

const Logo = mongoose.models.Logo || mongoose.model('Logo', logoSchema);
export default Logo;
