import mongoose from "mongoose";

// Check if the model is already compiled to avoid recompiling
const Article = mongoose.models.Article || mongoose.model("Article", new mongoose.Schema({
    heading: String,
    des: String,
    year: Number,
    file: {
        public_id: String,
        url: String,
    },
    fileType: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review", // Assuming you store the Review reference
        }
    ]
}));

export default Article;
