const mongoose=require("mongoose")

const {Schema,model}=mongoose

const commentsSchema=new Schema({
    content:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }

})

const CommentModel=model("Comment",commentsSchema)

module.exports=CommentModel

