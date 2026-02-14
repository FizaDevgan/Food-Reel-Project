//logic for server connected with database

const mongoose= require('mongoose')


function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("mongoDB connected")
    })
    .catch((err)=>{
        console.log("MongoDB connection error", err)
    })
}

module.exports=connectDB;