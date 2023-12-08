const express=require("express")
const app=express()
const Port=3046
const cors=require("cors")
app.use(express.json())
app.use(cors())
const userCltr = require("./Controllers/userCltr")
const configDb = require("./ConfigDb/Configdb")
const authenticate = require("./Middlewears/authenticate")
const postCltr = require("./Controllers/postCltr")
const commentCtrl = require("./Controllers/commentCltr")
configDb()

/*-------------------------------------------------------------------------------- */
app.post("/api/users/register ",userCltr.create)
app.post("/api/users/login",userCltr.login)
app.get("/api/users/profile",authenticate,userCltr.profile)
app.put("/api/users/profile",authenticate,userCltr.profileUpdate)

/*-------------------------------------------------------------------------------- */

app.post("/api/posts",postCltr.create)
app.get("/api/posts",postCltr.getAllPosts)
app.get("/api/posts/:id",postCltr.getSinglePost)
app.put("/api/posts/:id",authenticate,postCltr.updatePost)
app.delete("/api/posts/:id",authenticate,postCltr.deletePost)
app.get("/api/posts/myposts",authenticate,postCltr.authorPosts)

/*-------------------------------------------------------------------------------- */

app.post("/api/posts/:postId/comments",authenticate,commentCtrl.create)
app.get("/api/posts/:postId/comments",commentCtrl.getComments)
app.listen(Port,()=>{
    console.log("backend connected successfully"+" "+Port)
})