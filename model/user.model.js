const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    Username:{type:String, required:true},
    Avatar:{type:String, required:true},
    Email:{type:String, required:true},
    Password:{type:String, required:true}
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}