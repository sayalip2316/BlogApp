const express=require("express");
const {BlogModel}=require("../model/blog.model");
const BlogRouter=express.Router();

BlogRouter.get("/blogs",async(req,res)=>{
    const {title,category,sort}=req.query
    try {
        const sortvalue=(sort==="asc")?1:-1;
        if(title && !category && !sort){
            const blogs=await BlogModel.find({title:{ $regex: title, $options: 'i'}})
        return res.status(200).json(blogs)
        }
        if(!title && category && !sort){
            const blogs=await BlogModel.find({category:category})
        return res.status(200).json(blogs)
        }
        if(!title && !category && sort){
            const blogs=await BlogModel.find().sort({date:sortvalue})
        return res.status(200).json(blogs)
        }
        if(!title && category && sort){
            const blogs=await BlogModel.find({category:category}).sort({date:sortvalue})
        return res.status(200).json(blogs)
        }
        const blogs=await BlogModel.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).send(error)
    }
})

BlogRouter.post("/blogs",async(req,res)=>{
    const {username,title, content, category}=req.body
    try {
        const blog=new BlogModel({username,title, content, category})
        await blog.save()
        res.status(200).send({msg:"Blog posted successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

BlogRouter.put("/blogs/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await BlogModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({msg:"Blog updated successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

BlogRouter.delete("/blogs/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await BlogModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Blog deleted successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

BlogRouter.put("/blogs/:id/like", async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await BlogModel.findOne({ _id: id });
        if (blog) {
            blog.likes++; 
            await blog.save();
            res.status(200).send(blog);
        } else {
            res.status(404).send({ error: "Blog not found" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

BlogRouter.patch("/blogs/:id/comment", async (req, res) => {
    const { id } = req.params;
    const {username, content}=req.body;
    try {
        const blog = await BlogModel.findOne({ _id: id });
        if (blog) {
            blog.comments.push({username, content})
            await blog.save();
            res.status(200).send(blog);
        } else {
            res.status(404).send({ error: "Blog not found" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports={BlogRouter}