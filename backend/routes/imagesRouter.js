const router = require("express").Router()
const fs = require("fs");
const {dirname, join} = require("path")
const multerConfig = require("../midllewares/multer-config");

router.post("/", multerConfig, (req, res) => {
    let {uploaded_image, success} = req.upload_playload;
    let {path, filename, truename} = uploaded_image;

    if (!success) {
        // delete this file
        fs.rm(join(__dirname, path), (err, b) => {
            if (!err) {
                console.log(`image is deleted: ${path}`)
            }else{
                console.error("Image deletion error")
            }
        });

        res.status(404).json({
            error_message: "invalid file extension (would be jpg, png or gif"
        })
     }else {
        if (path && filename && truename) {
            // all right, return path
    
            res.status(200).json({
                image_url: process.env.DOMAIN + path,
            })
        }else {
            res.status(504);
        }
    }
})

module.exports = router;