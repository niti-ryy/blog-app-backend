const express=require("express")
const app=express()
const Port=3046
const cors=require("cors")
app.use(express.json())
app.use(cors())
const userCltr = require("./Controllers/userCltr")
const configDb = require("./ConfigDb/Configdb")
const authenticate = require("./Middlewears/authenticate")
configDb()

app.post("/api/users/register ",userCltr.create)
app.post("/api/users/login",userCltr.login)
app.get("/api/users/profile",authenticate,userCltr.profile)

app.listen(Port,()=>{
    console.log("backend connected successfully"+" "+Port)
})