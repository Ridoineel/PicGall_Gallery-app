const multer = require("multer");

const MIME_TYPES = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif"
}


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        
        let filename = file.originalname
        let extension = MIME_TYPES[file.mimetype] || "";
        let new_filename;
        let success;

        // replace " " -> "_"
        filename = filename.replaceAll(" ", "_")

        // split by dot
        let name_split = filename.split(".")
        
        if (name_split.length != 1) {
            truename = name_split.slice(0, -1).join("_");
        }else {
            truename = name_split[0];
        }


        if (extension) {
            success = true;
            new_filename = `${Date.now()}_${truename}.${extension}`;
        }else {
            success = false;
            new_filename = `${Date.now()}_${truename}`;
        }


        req.upload_playload = {
            success: success,
            uploaded_image: {
                path: "/images/" + new_filename,
                filename: new_filename,
                truename: truename
            }
        }

        callback(null, new_filename);
    }
})

module.exports = multer({storage: storage}).single("image");