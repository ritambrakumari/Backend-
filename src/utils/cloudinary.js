import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret:process.env.API_SECRET
});
const uploadoncloudinary = async (localfilepath)=>{
  try{
    if(!localfilepath)return null
    // upload the file on cloudinary
    const response =await cloudinary.uploader.upload(localfilepath,{
      resource_type:"auto"
    })
    //file has been uploaded suceesfully
  console.log("file has been uploaded successfully",response.url)
  return response
  }
  catch(error){
    fs.unlinkSync(localfilepath) // remove the locally saved file as the upload operation got failed
    return null;
  }
}
export {uploadoncloudinary}