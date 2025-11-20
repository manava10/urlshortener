const Url = require('../models/UrlSchema');
const {nanoid} = require("nanoid");

exports.handleGenerateNewShortUrl = async (req, res) =>{
    try{
        const shortId = nanoid(4);
        const body = req.body;
        const url = body.url;
        if(!url){
            return res.status(400).json({
                error:"Url is required"
                ,
                message:"url field cannot be empty"
            })
        }
        const newUrl = `http://localhost:${process.env.PORT}/api/${shortId}`
        const object = await Url.create({
            originalUrl:url,
            shortId:shortId,
            redirectUrl:newUrl,
            visitHistory:[]
        })
        return res.status(201).json({
            status:"Success",
            data:object
        })

    }catch(err){
        console.log("Error caught :"+err.message);
        return res.status(500).json({
            "message":"Failed to generate URL"

        })
    }
}
exports.handleGenerateUrl = async (req, res) =>{
    //Now we will handle the hashed shorted url to original one.
    try{
        const shortId = req.params.shortId;
        console.log("Short Id given "+shortId);
        const exist = await Url.findOne({
            shortId:shortId
        });
        if(!exist){
            return res.status(404).json({
                message:"The given url does not exist or it is revoked."
            })
        }
        const redirectUrl = exist.originalUrl;
        console.log(redirectUrl);
        return res.redirect(redirectUrl);

        // return res.status(200).json({
        //     status:"Success",
        //     originalUrl:redirectUrl
        // })
    }catch(err){
        console.log("Error caught:"+err.message);
        return res.status(500).json({
            "message":"Failed to resolve URL."
        })
    }
}