const _ =require("lodash")
const bcrypt=require("bcrypt")
const userCltr={}
const User=require("../Models/UserModel")

userCltr.create=async(req,res)=>{
    
    const body=_.pick(req.body,["username", "email", "passwordHash", "createdAt", "updatedAt", "profilePicture","bio"])
    console.log(req.body)
    try{
        const salt=await bcrypt.genSalt(10)
        console.log(salt,body.passwordHash)
        const hashedpassword=await bcrypt.hash(body.passwordHash,salt)
        const user = new User({ ...body, passwordHash: hashedpassword })

        const savedUser=await user.save()
        res.status(200).json({
            message:"registration Successfull",
            obj:savedUser
        })
    }catch(e){
        res.status(401).json({
            message:e.message
        })
    }

}



module.exports=userCltr