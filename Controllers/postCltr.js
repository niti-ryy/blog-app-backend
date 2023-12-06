const postCltr={}
const Post=require("../Models/PostModel")
const _ =require("lodash")

postCltr.create=async(req,res)=>{
    const body=_.pick(req.body,["title","content","featuredImage","author","createdAt","comments","tags"])
    const post=new Post(body)
    try{
        const savedPost=await post.save()
        if(!savedPost){
            return res.status(401).json({
                message:"failed to save the post"
            })
        }
        res.json({
            message:"post saved successfully",
            obj:post
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

postCltr.getAllPosts=async(req,res)=>{
    try{
        const posts=await Post.find()
        res.json({
            posts:posts
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

postCltr.getSinglePost=async(req,res)=>{
    const {id}=req.params
    try{
        const post=await Post.findById(id)
        res.json({
            post:post
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

postCltr.updatePost=async(req,res)=>{
    const {body}=req
    const {id}=req.params
    try{
        const post=await Post.findByIdAndUpdate({_id:id},body,{new:true})
        res.json({
            post:post
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

postCltr.deletePost=async(req,res)=>{
    const {id}=req.params
    try{
        const post=await Post.findByIdAndDelete(id)
        if(post){
            res.json({
            post:post,
            message:"Blog Deleted Successfully"
        })
        }
        
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

postCltr.authorPosts=async(req,res)=>{
    const {id}=req.user
    console.log(req.user)
    try{
        const post=await Post.find({author:id})
        res.json(post)
    }catch(e){
        res.status(500).json({
            message:e.message
        })  
    }
    
}


//this is combinationn of both with id and all the posts

// postCltr.getPosts=async(req,res)=>{
//     const {id}=req.body
//     try{
//         if(!id){
//             const posts=await Post.find()
//             return res.json({
//                 posts:posts
//             }) 
//         }

//         const post=await Post.findById(id)
//         res.json({
//             post:post
//         })
//         if (!post) {
//             return res.status(404).json({
//               message: "Post not found",
//             })
//           }
//     }catch(e){
//         res.status(500).json({
//             message:e.message
//         })
//     }
// }

module.exports=postCltr