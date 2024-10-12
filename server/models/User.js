import mongoose from "mongoose";
import crypto from "crypto"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"],
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:[true, "Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlenght:[6,"Password must be at least 6 characters"],
        select:false,
    },
    articles:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Article"
        }
    ],

    // resetPasswordToken:String,
    // resetPasswordExpire:Date,
})

// userSchema.methods.getResetPasswordToken = function(){

//     const resetToken = crypto.randomBytes(20).toString("hex")
//     console.log(resetToken)

//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
//     this.resetPasswordExpire=Date.now()+10*60*1000
//     return resetToken
// }

const User = mongoose.model("User",userSchema)
export default User