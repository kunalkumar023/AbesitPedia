import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Article from "../models/Post.js"


export const registerUser = async (req, res) => {
    try {
        const {name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
     
        // const myCloud = await cloudinary.v2.uploader.upload(avatar,{
        //     folder:"avatar",
        // })
      
        user = await User.create({ name, email, password:hashedPassword });
        res.status(201).json({
            success: true,
            message:"User sign up successfully",
            user
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const loginUser=async(req,res)=>{
    try {
        
        const {email,password} =req.body;
        const isUser = await User.findOne({email}).select("+password")
        if(!isUser){
            return res.json({
                success:false,
                message:"User not exists please Register yourself...."
            })
        }
        if (await bcrypt.compare(password, isUser.password)) {
            const token = jwt.sign({ _id: isUser._id }, process.env.KEY);
        
            res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true, 
            })
            .json({
                success: true,
                message: "User login successful",
                isUser,
                token
            });
        }        
        else{
            return res.json({
                success:false,
                message:"Password doesn't match"
            })
        }
    } catch (error) {

        res.status(500).json({
            success:true,
            message:error.message
        })
    }
    
}

export const logout=async(req,res)=>{
    try {
        
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Logout successfully.."
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

//get my articles
export const myArticles=async(req,res)=>{
    try {
        const articles = await Article.find({ owner: req.user._id });
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
}

// get articles by user id
export const getUserAtricles=async(req,res)=>{
    try {
        const userId = req.params.userId;

        // Fetch all articles for the user with the given ID
        const articles = await Article.find({ owner: userId });

        // Check if the user has any articles
        if (!articles.length) {
            return res.status(404).json({
                success: false,
                message: 'No articles found for this user.',
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
}

//See my profile
export const myProfile = async (req, res) => {
    try {
        // Fetch user data from the authenticated user
        const user = await User.findById(req.user._id).select('-password').populate("articles"); // Exclude password from response
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get any user
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Fetch user data by ID excluding password
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Fetch articles posted by the user
        const articles = await Article.find({ owner: userId });

        res.status(200).json({
            success: true,
            user,
            articles, // Include articles in the response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




  



