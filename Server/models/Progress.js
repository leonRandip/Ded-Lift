const mongoose=require('mongoose')

const ProgressSchema= new mongoose.Schema({
    name: String,
    size: String,
    img: String,
    img2: String
})
const ProgressModel= mongoose.model("progressdatas",ProgressSchema)
module.exports= ProgressModel