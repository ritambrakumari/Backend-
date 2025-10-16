import mongoose from "mongoose"
import{DB_name} from "../constants.js";

const connectdb=async ()=>{
    try{

    const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`)
    console.log(`\n MongoDB connected !! DB HOST:${connectioninstance.connection.host}`)
    }catch(error){
        console.log("MONGODB CONNECTION ERROR", error);
        process.exit(1);
    }
}

export default connectdb