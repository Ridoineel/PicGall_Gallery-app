const router = require("express").Router()
const fs = require("fs");
const {dirname, join} = require("path")
const multerConfig = require("../midllewares/multer-config");

router.post("/", multerConfig, (req, res) => {
    /* upload image file */

    let {uploaded_image, success} = req.upload_playload;
    let {path, filename, truename} = uploaded_image;

    if (!success) {
        // delete this file
        fs.rm(join(dirname(__dirname), path), (err, b) => {
            if (!err) {
                console.log(`image is deleted: ${path}`)
                
                res.status(404).json({
                    error_message: "invalid file extension (would be jpg, png or gif"
                })
            
            }else{
                console.error("Image deletion error")
                
                res.status(504).json({
                    status: 504,
                })
            }
        });
     }else {
        if (path && filename && truename) {
            // all right, return path
    
            res.json({
                image_url: process.env.DOMAIN + path,
            })
        }else {
            res.status(504).json({
                status: 504,
            });
        }
    }
})

// get

router.get("/all ", (req, res) => {
    /* Get all images files != untitled filed 
    *
    */

    let files_url = [];
    let url;

    fs.readdir(join(dirname(__dirname), "images"), (err, files) => {
        if (!err) {
            files.forEach((filename) => {
                if (filename != "untitled") {
                    url = process.env.DOMAIN + "/images/" + filename
                    files_url.push(url);
                }
            })

            res.json(files_url);
        } else {
            console.log(err);
        }     
    })
})

// delete

router.delete("/", (req, res) => {
    /* Delete all images
    *
    */

    fs.readdir(join(dirname(__dirname), "images"), (err, files) => {
        if (!err) {
            files.forEach((filename) => {
                if (filename != "untitled") {
                    // delete image

                    fs.rm(join(dirname(__dirname), "images", filename), (err, data) => {
                        if (!err) {
                            console.log(`image ${filename} is deleted`)
                        }else{
                            console.error(`Image ${filename} deletion error`, err);
                        }
                    })
                }
            })
            
            res.json({
                success: true,    
            })
            
        } else {
            console.log(err);

            res.status(504).json({
                status: 504,
            });
        }     
    })
}) 

router.delete("/:filename", (req, res) => {
    /* Get delete one image
    *
    */

    // filename
    let filename = req.params.filename;

    if (filename) {
        fs.rm(join(dirname(__dirname), "images", filename), (err, data) => {
            if (!err) {
                console.log(`image ${filename} is deleted`)
            
                res.json({
                    success: true,    
                })
            }else{
                console.error(`Image ${filename} deletion error`);
            }
        })
    }else {
        res.status(404).json({
            success: false,
            error_message: "image not found"    
        })
    }
})

module.exports = router;