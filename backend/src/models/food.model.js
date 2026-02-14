const mongoose=require('mongoose')

const foodSchema= new mongoose.Schema({
   name:{
    type:String,
    required:true
   },

   video:{
    //url of video
    type:String,
    required: true
   },
   description:{
    type:String
   },
   foodPartner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"foodpartner"
   },
   likeCount:{
      type:Number,
      default:0
   }

})

const foodModel= mongoose.model("food", foodSchema);

module.exports=foodModel