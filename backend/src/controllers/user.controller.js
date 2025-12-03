import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import {Booking} from "../models/booking.models.js"


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = AsyncHandler(async (req,res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists: username,email
    //check for images 
    //check for avatar
    //upload them to cloudinary,avatar
    //create user object - create entry in db
    //remove password and refresh token fiels fro response
    //check for user creation
    //return response

   const {lastname,firstname,phoneno,password} = req.body

   
//    console.log("password",password)
//    console.log("fullname",fullname)
//    console.log("username",username)

// if(fullname===""){
//     throw new ApiError(400,"fullname is required")
// }
// console.log("req.body ",req.body)
if(!firstname?.trim() || !lastname?.trim() || !password?.trim() || !phoneno) {
       throw new ApiError(400, "all fields are required")
   }

const existedUser =await User.findOne({
    $or: [{phoneno}]
})

if(existedUser){
    throw new ApiError(409,"user is already registered")
}

// const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImageLocalPath = req.files?.coverImage[0]?.path;

// console.log("file : ",req.files)

// if(!avatarLocalPath){
//     throw new ApiError(400," Avatar file is required")
// }

// const avatar = await uploadOnCloudinary(avatarLocalPath)
// const coverImage = await uploadOnCloudinary(coverImageLocalPath)

// if(!avatar){
//     throw new ApiError(400,"avatar file is required")
// }

const user = await User.create({
    firstname,
    lastname,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    phoneno,
    password,
    // username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
)
 


})

const loginUser = AsyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {phoneno,password} = req.body
console.log(phoneno)
    if (!phoneno) {
        throw new ApiError(400, "phoneno is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{phoneno}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")

    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!user || !isPasswordValid) {
    return res.status(400).json({message:"Invalid phone number or password!!"});
    
    }

   const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, newRefreshToken
            },
            "User logged In Successfully"
        )
    )

})

const resetPassword = AsyncHandler(async (req, res) => {
  const { newPassword, phoneno } = req.body;

  // basic validation
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    throw new ApiError(400, 'newPassword is required and must be at least 6 characters');
  }

  // choose user by logged-in id OR by supplied phoneno (trim phoneno)
  let user;
  if (req.user?._id) {
    user = await User.findById(req.user._id);
  } else {
    if (!phoneno) throw new ApiError(400, 'phoneno is required when not authenticated');
    user = await User.findOne({ phoneno: phoneno.trim() });
  }
 if (!user) {
    throw new ApiError(404, 'User not found');
  }


//    const hashed = await bcrypt.hash(newPassword, 10);
  user.password = newPassword;
  // assign new password and save (pre-save hook should hash it)
//   user.password = newPassword;
//   await user.save({ validateBeforeSave: false });
 await user.save();

 

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password changed successfully'));
});



const logoutUser= (async(req,res)=>{
     await User.findByIdAndUpdate( 
        req.user._id,
        {
            $set:{
                refreshToken: 1
            }
        },
        {
            new:true
        }
    )

     const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse (200,{}, "User Logged out successfully!!"))
    
    
    
})

const refreshAccessToken= AsyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
    }

   try {
    const decodedToken=  jwt.verify(
         incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
     )
 
     const user= await User.findById(decodedToken?._id)
 
     if(!user){
         throw new ApiError(401,"Invalid refresh token")
     }
 
     if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401, "Refresh Token is expired or used")
     }
 
     const options = {
         httpOnly: true,
         secure: true
     }
 
     await generateAccessAndRefereshTokens(user._id)
 
     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", newRefreshToken, options)
     .json(
         new ApiResponse(
             200,
             {accessToken, refreshToken:newRefreshToken},
             "Access token refreshed"
         )
     )
 
 
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
    
   }
})

const registerBooking=AsyncHandler(async(req,res)=>{
        const{date,username,slot,city,temple,differentlyAbled,elders,visitors,phone,id }=req.body

        if(!username || !temple || !slot || !date || !phone ||!city||!id||!visitors){
            throw new ApiError(400,"all fields are required")
        }

         if (!req.user?._id) {
        throw new ApiError(401, "User must be logged in to make a booking");
        }



        const booking=await Booking.create({
            date,username,slot,city,temple,differentlyAbled,elders,visitors,phone,id,bookedBy: req.user._id
        })


        const createdBooking=await Booking.findOne({id:booking.id}).select(
            "-date -username -slot -city -temple -differentlyAbled -elders -visitors -phone"
        )
        if(!createdBooking){
            throw new ApiError(500,"something went erong while booking")
        }
        return res.status(201).json(
            new ApiResponse(200,createdBooking,"Booking completed successsfully")
        )
})

const getBookingHistory = AsyncHandler(async (req, res) => {
    // Get the logged-in user's ID
    if (!req.user?._id) {
        throw new ApiError(401, "User must be logged in");
    }

    // Fetch all bookings created by this user
    const bookings = await Booking.find({ bookedBy: req.user._id })
        .sort({ createdAt: -1 })  // Newest first
        .select('-__v');

    if (!bookings || bookings.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, [], "No booking history found")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, bookings, "Booking history fetched successfully")
    );
});


export {registerUser}
export {loginUser}
export {logoutUser}
export {refreshAccessToken}
export {resetPassword}
export {registerBooking}
export {getBookingHistory}