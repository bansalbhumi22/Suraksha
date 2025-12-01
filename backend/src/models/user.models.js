// import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"

// const userSchema= new Schema({
   
//     name:{
//          type: String,
//         required: true,
//         trim: true,
//         index: true
//     },
   
//     coverImage:{
//         type: String 
//     },
//     bookingHistory:[{
//          type:mongoose.Schema.Types.ObjectId,
//          ref: "Booking"
//         }
       
//     ],
//     total:{
//         type: Number,
//         required: true
//     },
//      elders:{
//         type: Number,
//         required: true
//     },
//      differentlyAbled:{
//         type: Number,
//         required: true
//     },
   
//    phone:{
//         type:Number,
//         required:true,
//             validate: {
//         validator: function (v) {
//             return /^[0-9]{10}$/.test(v);
//         },
//         message: props => ${props.value} is not a valid 10-digit phone number!
//     }
//     }

// },
// {
//     timestamps:true,
// }

// )
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    //     index: true
    // },
    phoneno:{
        type: Number,
        required: true,
        unique: true,
        
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    // avatar: {
    //     type: String, //cloudinary service 
    //     required: true,

    // },
    // coverImage: {
    //     type: String,
    // },
    // watchHistory: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Video"
    //     }
    // ],
    password: {
        type: String,
        required: [true,'password is required']
    },
    refreshToken: {
        type: String
    }
},{timestamps: true})

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return ;
     if (typeof this.password === 'string' && this.password.startsWith('$2')) {
    return;
  }

    this.password = await bcrypt.hash(this.password,10)
    

    // next()
})

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password)
// }
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  if (!candidatePassword) {
    console.warn('[AUTH DEBUG] isPasswordCorrect called with empty candidatePassword for user:', this._id);
    return false;
  }
  if (!this.password) {
    console.warn('[AUTH DEBUG] isPasswordCorrect: stored hash missing for user:', this._id);
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
        {
            _id: this._id,
            // email: this.email,
            phoneno:this.phoneno,
            // username: this.username,
            firstname: this.firstname,
            lastname: this.lastname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)