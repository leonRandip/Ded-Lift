const mongoose=require('mongoose')
const wilksSchema = new mongoose.Schema({
    bodyWeight: Number,
    totalWeight: Number,
    wilksScore: Number,
  })

  const DataModel= mongoose.model("userdata", wilksSchema)
  module.exports=DataModel