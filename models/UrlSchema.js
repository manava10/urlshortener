const mongoose = require('mongoose');

const urlSchema =new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visitHistory : [{
        timeStamp:{
            type:Number
        }
    }]
},{timestamps:true},{strict:true});
const Url = mongoose.model("Url",urlSchema);
module.exports = Url;