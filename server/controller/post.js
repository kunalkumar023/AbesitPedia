import Article from '../models/Post.js';
import Review from '../models/Review.js';
import User from "../models/User.js"
import cloudinary from "cloudinary"


// Function to create a new article
export const createArticle = async (req, res) => {
    try {
        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Function to handle Cloudinary upload with a Promise
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.v2.uploader.upload_stream(
                    { resource_type: "auto", folder: "articles" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload failed:", error); // Log the exact error
                            reject(new Error("Cloudinary upload failed"));
                        } else {
                            console.log("Cloudinary upload result:", result); // Log the result for debugging
                            resolve(result);
                        }
                    }
                );
                stream.end(req.file.buffer); // Send the file buffer to the stream
            });
        };
        
        // Upload file to Cloudinary
        const myCloud = await uploadToCloudinary();
        

        // Create the new article data
        const newArticleData = {
            heading: req.body.heading,
            des: req.body.des,
            year: req.body.year,
            file: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            fileType: req.body.filetype, // Either image, pdf, word
            owner: req.user._id,
        };

        // Create and save the new article
        const newArticle = await Article.create(newArticleData);

        // Add the article ID to the user's articles list
        const user = await User.findById(req.user._id);
        user.articles.unshift(newArticle._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Article created successfully",
            article: newArticle,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//show Articles by year
export const getArticles = async (req, res) => {
    try {
        const year = Number(req.params.year);  // Convert to number

        // if (isNaN(year)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid year format"
        //     });
        // }

        // Find articles by year and populate both 'owner' and 'reviews.owner'
        const articles = await Article.find({ year: year })
            .populate('owner')           // Populating the owner of the article
            .populate({
                path: 'reviews',          // Populating reviews
                populate: {
                    path: 'owner',        // Deep populate owner inside reviews
                    select: 'name email' // Populate selected fields from owner
                }
            });
           

        if (articles.length === 0) {
            return res.json({
                success: false,
                message: "No articles found for this year",
                articles:[]
            });
        } 

        res.status(200).json({
            success: true,
            articles,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const addReview = async (req, res) => { 
    try {
        const article = await Article.findById(req.params.id);
        console.log(article)
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found"
            });
        }

        // Check if the user already has a review
        let reviewIndex = -1;
        
        article.reviews.forEach((reviewId, index) => {
            if (reviewId.user && reviewId.user.toString() === req.user._id.toString()) {
                reviewIndex = index;
            }
        });

        if (reviewIndex !== -1) {
            // If the user already reviewed, update the review
            const existingReview = await Review.findById(article.reviews[reviewIndex]);

            if (existingReview) {
                existingReview.des = req.body.desc;
                await existingReview.save();  // Save updated review

                res.status(200).json({
                    success: true,
                    message: "Review updated",
                    review: existingReview
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Review not found"
                });
            }
        } else {
            // If it's a new review, create it
            const newReview = await Review.create({
                owner: req.user._id,
                des: req.body.des,
                articleId:article._id
            });

            article.reviews.push(newReview._id);
            await article.save();  

            res.status(200).json({
                success: true,
                message: "review added",
                review: newReview
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get article by id
export const getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;  // Get the article id from the URL parameters

        const article = await Article.findById(articleId);  // Find article by ID

        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found",
            });
        }

        res.status(200).json({
            success: true,
            article,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//uovote article
export const toggleUpvoteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found.",
            });
        }

        const userId = req.user._id;

        // Check if the user has already upvoted the article
        if (article.upvotes.includes(userId)) {
            // Remove user ID from the upvotes array
            article.upvotes.pull(userId);
            await article.save();

            return res.status(200).json({
                success: true,
                message: "Upvote removed successfully.",
                upvotes: article.upvotes.length,
            });
        } else {
            // Add user ID to the upvotes array
            article.upvotes.push(userId);
            await article.save();

            return res.status(200).json({
                success: true,
                message: "Article upvoted successfully.",
                upvotes: article.upvotes.length,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//upvote reviews
export const toggleUpvoteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id); // Assuming `Review` is your review model
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found.",
            });
        }

        const userId = req.user._id;

        // Check if the user has already upvoted the review
        if (review.upvotes.includes(userId)) {
            // Remove user ID from the upvotes array
            review.upvotes.pull(userId);
            await review.save();

            return res.status(200).json({
                success: true,
                message: "Upvote removed successfully.",
                upvotes: review.upvotes.length,
            });
        } else {
            // Add user ID to the upvotes array
            review.upvotes.push(userId);
            await review.save();

            return res.status(200).json({
                success: true,
                message: "Review upvoted successfully.",
                upvotes: review.upvotes.length,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

