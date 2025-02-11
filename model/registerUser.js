import mongoose from "mongoose";


const userShema = new mongoose.Schema(
    {
        name:{required:true,type:String},
        email:{required:true,type:String, unique:true},
        password:{required:true,type:String},
        cart:{type:Object, default:{}}
    },{minimize:false}

)


const UserModel =  mongoose.model("User", userShema);

export default UserModel;