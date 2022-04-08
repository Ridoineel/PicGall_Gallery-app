const fs = require("fs");
const {join} = require("path");

const del =  async (path) => {
    fs.rm(path, (err, data) => {
        if (!err) {
            // success
            return true;
        }else{
            // fall
            return false;
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