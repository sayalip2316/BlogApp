const express=require("express");
const app=express();
const {connection}=require("./config/db");
const cors=require("cors");
const {UserRouter}=require("./routes/user.routes");
const {BlogRouter}=require("./routes/blog.routes");
const {auth}=require("./middleware/auth.middleware");

app.use(express.json());
app.use(cors())
app.use("/api",UserRouter);
app.use(auth)
app.use("/api",BlogRouter);

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log("Connected to db")
        console.log(`Server is listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
   
})