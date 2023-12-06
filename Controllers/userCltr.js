const _ =require("lodash")
const bcrypt=require("bcrypt")
const userCltr={}
const User=require("../Models/UserModel")
const jwt=require("jsonwebtoken")

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

userCltr.login=async(req,res)=>{
    const body=_.pick(req.body,["email","password"])
    try{
      const user=await User.findOne({email:body.email})
      if(!user){
        res.status(500).json({
            message:"Invalid email or password"
        })
      }
      const verifyPassword=await bcrypt.compare(body.password,user.passwordHash)
      if(!verifyPassword){
        res.status(500).json({
            message:"Invalid email or password"
        })
      }
      const tokenData={
        id:user._id,
        email:user.email
      }

      const token=jwt.sign(tokenData,"SECRET123")
      res.status(200).json({
        message:"login Successfull",
        obj:user,
        token:`Bearer ${token}`
      })

    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}


userCltr.profile=async(req,res)=>{
    const {id} =req.user
    try{
        const user=await User.findById(id)
        res.json({
            message:user
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}



module.exports=userCltr