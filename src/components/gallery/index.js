import {useState} from "react";
import UploadForm from "../uploadForm"

function Gallery() {
    return (
        <div className="gallery">
            <div className="gallery-header">
                <h1>Your Pictures</h1>

                <div>
                    Lorem Ipsum dolor sit amet, 
                    consecteur adipiscing elit.
                </div>
            </div>

            <UploadForm />

            <div className="gallery-body">

            </div>
        </div>
    )
}

export default Gallery;