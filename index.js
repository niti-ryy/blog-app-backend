const express=require("express")
const app=express()
const Port=3046
const cors=require("cors")




app.listen(Port,()=>{
    console.log("backend connected successfully"+" "+Port)
})