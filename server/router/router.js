import express from "express";

const router = express.Router();

// tüm postları çekmek için
router.get("/",async (req,res)=>{
    console.log("get all posts");
    res.send("get all posts");
})

// tek bir postu çekmek için
router.get("/:id",async (req,res)=>{
    console.log(`get  post with id: ${req.params.id}`);
})

// gönderi eklemek için 
router.post("/",async(req,res)=>{
    console.log("post new post");
})

// update etmek için (kullanılmayabilir)
router.put("/:id",async(req,res)=>{
    console.log(`update post with id: ${req.params.id}`);
})

// delete etmek için (kullanılmayabilir)
router.delete("/:id",async(req,res)=>{
    console.log(`delete post with id: ${req.params.id}`);
})

export default router;
