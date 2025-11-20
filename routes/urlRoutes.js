const express = require('express');
const controller = require("../controllers/urlControllers");
const router = express.Router();


router.post('/create',controller.handleGenerateNewShortUrl);
router.get('/health',(req,res)=>{
    res.status(200).json({
        status:"Server is healthy and is running on the designated Port"
    })
})
router.get('/:shortId',controller.handleGenerateUrl);

module.exports = router;