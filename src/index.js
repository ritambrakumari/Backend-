
import { app } from "./app.js"; 
import connectdb from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();






connectdb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed",err)
})
