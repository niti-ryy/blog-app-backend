const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema={
    username:{
        type:String
    },
    email:String,
    passwordHash:String,
    createdAt:Date,
    updatedAt:Date,
    profilePicture:String,
    bio:String
}

const User=mongoose.model("User",userSchema)

module.exports=User