const { default: mongoose } = require("mongoose")

async function connectToDb(){
    try {
      const conn=await mongoose.connect(process.env.MONGO_URI)  
      console.log("Connected with database");
    } catch (error) {
        console.log("error in connecting with database",error)
    }
}
module.exports=connectToDb