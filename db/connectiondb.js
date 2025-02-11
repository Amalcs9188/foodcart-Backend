import mongoose from "mongoose";



// Connect to MongoDB


export const connectDB = async () => {
    
        await mongoose.connect('mongodb+srv://amalcs645:amalcs645@cluster0.qimvj.mongodb.net/Foodcart').then(()=>{
            console.log("Database connected")
        })
       
    
};