import mongoose from "mongoose";
const Review = mongoose.models.Review || mongoose.model("Review", new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    articleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article"
    },
    des: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

export default Review;
