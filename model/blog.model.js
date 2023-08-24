const mongoose=require("mongoose");

const blogSchema=mongoose.Schema({
    username: {type:String},
    title: {type:String, required:true},
    content:{type:String, required:true},
	category :{type:String, enum:[ "Business", "Tech", "Lifestyle", "Entertainment"], required:true},
	date: { type: Date, default: Date.now },
	likes : {type:Number, default:0},
	comments: [
        {
          username: String,
          content: String,
        },
      ]
})

const BlogModel=mongoose.model("blog",blogSchema);

module.exports={BlogModel}