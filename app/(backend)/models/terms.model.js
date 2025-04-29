import mongoose from 'mongoose';

const termsSchema = new mongoose.Schema({
    
    content: {
        type: String,
        required: true,
    },
});

const  Terms = mongoose.models.Terms || mongoose.model('Terms', termsSchema);
export default Terms;