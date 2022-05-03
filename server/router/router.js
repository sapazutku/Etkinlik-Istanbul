import express from "express";
import Post from "../db/posts.js";

const router = express.Router();

// tüm postları çekmek için
router.get("/",async (req,res)=>{
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (error) {
        console.log(error);
    }
})

// tek bir postu çekmek için
router.get("/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
          res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
})

// gönderi eklemek için 
router.post("/",async(req,res)=>{
    try {
      const post = req.body;
      const createdPost = await Post.create(post);
      res.status(201).json(createdPost);
    } catch (error) {
      console.log(error);
    }
});

// update etmek için (kullanılmayabilir)
router.put("/:id",async(req,res)=>{
    console.log(`update post with id: ${req.params.id}`);
})

// delete etmek için (kullanılmayabilir)
router.delete("/:id",async(req,res)=>{
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id);
      res.json({ msg: "Post deleted" });
    } catch (error) {
      console.log(error);
    }
})

export default router;
