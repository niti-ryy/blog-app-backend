const commentCtrl = {};
const Post = require("../Models/PostModel");
const CommentModel=require("../Models/CommentModel")

commentCtrl.create = async (req, res) => {
  const { body } = req;
  const { postId } = req.params;
  try {
    const savedComment = new CommentModel(body).save();
    console.log(savedComment);
    await Post.findByIdAndUpdate({ _id: postId }, { $push: { comments: savedComment._id } });
    res.json("Comment saved successfully");
  } catch (e) {
    res.json(e.message);
  }
};

commentCtrl.getComments=async(req,res)=>{
    const {postId}=req.params
    try{
        const comments=await CommentModel.find({post:postId})

        if (comments.length === 0) {
            return res.status(404).json({
              message: "No comments found for this post",
            });
          }
        
        res.json({
            message:"reterived successfully",
            comments:comments
        })
    }catch(e){
        res.json({
            message:e.message
        })
    }
}

commentCtrl.updateComment=async(req,res)=>{
    const {postId,commentId}=req.params
    const {body}=req
    try{
        const comments=await CommentModel.findByIdAndUpdate({_id:commentId},body,{new:true})
        if (!updatedComment) {
            return res.status(404).json({
              message: "Comment not found",
            });
          }

        res.json({
            message:"updated successfully",
            comments:comments
        })
    }catch(e){
        res.status(500).json({
            message: e.message,
          })
    }
}

module.exports = commentCtrl;



//6570d7e5ed851193d8bf38ff