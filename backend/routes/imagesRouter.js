const router = require("express").Router()
const fs = require("fs");
const {dirname, join} = require("path")
const multerConfig = require("../midllewares/multer-config");
const filemanager = require("../utils/files")

router.post("/", multerConfig, async (req, res) => {
    /* upload image file */

    let {uploaded_image, success} = req.upload_playload;
    let {path, filename, truename} = uploaded_image;

    if (!success) {
        // delete this file
        if (filemanager.delete(join(dirname(__dirname), path))) {
            console.log("success");

            res.status(404).json({
                error_message: "invalid file extension (would be jpg, png or gif"
            })
        }else {
            console.log("error");

            res.status(504).json({
                status: 504,
            })
        }
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

router.get("/", (req, res) => {
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

    if (filemanager.deleteAll(join(dirname(__dirname), "images"))) {
        res.json({
            success: true,    
        })
    }else {
        res.status(504).json({
            status: 504,
        });
    }
}) 

router.delete("/:filename", (req, res) => {
    /* Get delete one image
    *
    */

    // filename
    let filename = req.params.filename;

    if (filename) {
        if (filemanager.delete(join(dirname(__dirname), "images", filename))) {
            console.log(`image ${filename} is deleted`)
            
            res.json({
                success: true,    
            })
        }else {
            console.error(`Image ${filename} deletion error`);
        }
    }else {
        res.status(404).json({
            success: false,
            error_message: "image not found"    
        })
    }
})

module.exports = router;