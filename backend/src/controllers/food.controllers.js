const foodModel=require('../models/food.model')
const likeModel=require('../models/likes.model')
const storageService=require('../services/storage.service')
const{v4:uuid}=require('uuid')

async  function createFood(req,res){
   console.log(req.foodPartner)

   console.log(req.body)
   console.log(req.file)

   const fileUploadResult= await storageService.uploadFile(req.file.buffer,uuid())
   console.log(fileUploadResult)

const foodItem= await foodModel.create({
    name:req.body.name,
    description:req.body.description,
    video:fileUploadResult.url,
    foodPartner:req.foodPartner._id
})


   res.status(201).json({
    message:"food created  successfully",
    food:foodItem

   })
}

async  function getFoodItems(req,res){
    const foodItems= await foodModel.find({})
    res.status(200).json({
        message:"food items fetched successfully",
        foodItems
    })
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body; // destructure correctly
    const user = req.user; // must come from auth middleware

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!foodId) {
      return res.status(400).json({ message: "Food ID required" });
    }

    // Check if already liked
    const isAlreadyLiked = await likeModel.findOne({
      food: foodId,
      user: user._id,
    });

    let liked;

    if (isAlreadyLiked) {
      // Unlike
      await likeModel.deleteOne({ food: foodId, user: user._id });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      liked = false;
    } else {
      // Like
      await likeModel.create({ food: foodId, user: user._id });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
      liked = true;
    }

    // Get updated like count
    const food = await foodModel.findById(foodId);

    return res.status(200).json({
      like: liked,
      likes: food.likeCount,
    });
  } catch (err) {
    console.error("LIKE ERROR 👉", err);
    return res.status(500).json({ message: "Server error" });
  }
}




module.exports={
    createFood,
    getFoodItems,
    likeFood
}