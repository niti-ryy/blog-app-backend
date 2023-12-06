const mongoose=require("mongoose")

const configDb=async()=>{
    try{
        const dbconnect=await mongoose.connect('mongodb://localhost:27017/Blog-app')
        console.log("db conncected")
    }catch(e){
        console.log(e.message)
    }
}

module.exports=configDb