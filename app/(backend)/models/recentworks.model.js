import mongoose from "mongoose";

const recentWorkSchema = new mongoose.Schema({
    location: {
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

const RecentWorks =
    mongoose.models.RecentWorks ||
    mongoose.model('RecentWorks', recentWorkSchema)
export default RecentWorks