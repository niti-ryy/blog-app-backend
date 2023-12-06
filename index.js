const express=require("express")
const app=express()
const Port=3046
const cors=require("cors")
app.use(express.json())
app.use(cors())
const userCltr = require("./Controllers/userCltr")
const configDb = require("./ConfigDb/Configdb")
configDb()

app.post("/register",userCltr.create)

app.listen(Port,()=>{
    console.log("backend connected successfully"+" "+Port)
})