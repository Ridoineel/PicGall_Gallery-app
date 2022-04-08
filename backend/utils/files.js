const fs = require("fs");
const {join} = require("path");

const del =  (path) => {
    fs.rm(path, (err, data) => {
        if (!err) {
            // success
            return false;
        }else{
            // fall
            return true;
        }
    });
} 

exports.delete = del;

exports.deleteAll = async (path) => {
    fs.readdir(path, (err, files) => {
        if (!err) {
            files.forEach((filename) => {
                if (filename != "untitled") {
                    // delete image
                    del(join(path, filename))
                }
            })
            
            return true;
            
        } else {
            console.error(err);
            return false
        }     
    });
} 