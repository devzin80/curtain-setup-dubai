import mongoose from 'mongoose';

const privacySchema = new mongoose.Schema({
    
    content: {
        type: String,
        required: true,
    },
});

const  Privacy = mongoose.models.Privacy || mongoose.model('Privacy', privacySchema);
export default Privacy;