// Purpose: Represents individual blog posts created by users.
// Fields: title , content (to store rich text or HTML content), author (reference to
// User model), createdAt , updatedAt , comments (array of references to Comment
// model), tags (array of ObjectId), featuredImage (URL or reference to an image).
const mongoose=require("mongoose")
const {Schema}=mongoose

const postsSchema=new Schema({
    title:String,
    content:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:Date,
    updateAt:Date,
    featuredImage:String,
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ],
      tags: [
        {
          type: mongoose.Schema.Types.ObjectId
        }
      ],

})

const Post=mongoose.model("Post",postsSchema)
module.exports=Post