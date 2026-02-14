const express=require('express')
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware')
const foodController=require('../controllers/food.controllers')
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage()
})
// POST /api/food/  [protected]
//create food items

router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single('video'),foodController.createFood)

//GET /api/food/[protected]  for normal users they can see reels
    //all videos here

    router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems)

    router.post('/like',authMiddleware.authUserMiddleware,foodController.likeFood)

    
module.exports=router