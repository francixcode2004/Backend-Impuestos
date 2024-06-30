const mongoose =require("mongoose")

 connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conectado a la base de ddatos mongo")
    }
    catch(err){
        console.log(err)

    }
}
module.exports = connectDB;