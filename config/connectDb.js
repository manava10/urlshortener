require('dotenv').config();
const mongoose = require('mongoose');
const conDb = async() =>{
    try{
        console.log("We are going to connect to mongoDb");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDb');
    }catch(err){
        console.log(err);
        console.log(`MongoDB connection failed: ${err}`);
        process.exit(1);
    }
}
module.exports = conDb;