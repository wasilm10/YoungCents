const mongoose=require("mongoose");
const connectDB=async()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("MongooseDB connected");
    }
    catch(err){
        console.error("error",err);
        process.exit(1);
    }
};

module.exports=connectDB;