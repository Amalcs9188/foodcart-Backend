import mongoose from "mongoose"


const orderShema = new mongoose.Schema({
    userId:{required:true,type:String},
    name:{required:true,type:String},

    phone:{required:true,type:String},
    pincode:{required:true,type:String},
    place:{required:true,type:String},
    address:{required:true,type:String},
    items:{required:true,type:Array},
    amount:{required:true,type:Number},
    status:{required:true,type:String, default:"Pending"},
    payment:{required:true,type:Boolean, default:false},
                      
    

})

const orderModel = mongoose.models.order || mongoose.model("order", orderShema);

export default orderModel;