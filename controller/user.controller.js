//import asyncHandler from "../utils/asyncHandler.js"
import {asyncHandler} from "../src/utils/asyncHandler.js";
import { APIerror } from "../src/utils/APIerror.js";
import {user} from "../models/user.model.js"
import { uploadoncloudinary } from "../src/utils/cloudinary.js";
import { APIresponse } from "../src/utils/APIresponse.js";

const registeruser=asyncHandler(async(req,res)=>{
  // for register user 
  //get user details from frontend
  // validation
  // check if user already exist :username,email
 // check for images
 // check for avatar
 // upload them to cloudenary
 // create user object -- create entry in db
 //remove password and refresh tokenfield from response
 //check for user creation
 //return response
 const {fullname,username,email,password}= req.body
 console.log("email",email)
   if ([fullname,email,username,password].some((field)=>field?.trim()==="")
  ){
      throw new APIerror(400,"All fields are required")
   }
   const existeduser=user.findOne({
     $or:[{username},{ email }]
   })
   if(existeduser){
    throw new APIerror(409,"user with email or username exist")
   }
   const avatarlocalpath=req.files?.avatar[0]?.path;
   const coverImagelocalpath= req.files?.coverImage[0]?.path;
    if(!avatarlocalpath){
      throw new APIerror(400,"Avatar file is required")
    }
   const avatar= await uploadoncloudinary(avatarlocalpath)
   const coverimage= await uploadoncloudinary(coverImagelocalpath)
   if(!avatar){
    throw new APIerror(400,"Avatar file is required")
   }
   const User=await user.create({
      fullname,
      avatar:avatar.url,
      coverimage:coverimage?.url || " ",
      email,
      password,
      username:username.toLowerCase()
    })
    const createduser=await user.findById(user._id).select(
      "-password -refreshToken"         // dunot want
    )
    if(!createduser){
      throw new APIerror(500,"something went wrong whle registering user")
    }
     return res.status(201).json(
       new APIresponse(200,createduser,"user registered succesfully")
     )
})
export default registeruser