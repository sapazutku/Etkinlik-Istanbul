// post Schema for mongoDB
import mongoose from "mongoose";

// daha sonra başka alanlar da eklenebilir.
// konum(park)
// time
// date
// tag
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator:{
        type:String,
        required:true
    },
    parkId:{
        type:Number,
        required:false
    }
});  

const Post = mongoose.model("Post", postSchema);

export default Post;