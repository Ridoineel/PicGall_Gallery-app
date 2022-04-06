import {useState, useEffect} from "react";
import UploadForm from "../uploadForm"
import ImageModal from "../imageModal";

function Gallery() {
    let [images, setImages] = useState([]);
    let [modal, setModal] = useState(null);

    const handleClick = (event) => {
        let image = event.target.parentNode.style.backgroundImage;

        image = image.substring(5, image.length - 2)

        if (image) {
            setModal(<ImageModal url={image} setModal={setModal} />)
        }

    }

    return (
        <div className="gallery">
            <div className="gallery-header">
                <h1>Your Pictures</h1>

                <div>
                    Lorem Ipsum dolor sit amet, 
                    consecteur adipiscing elit.
                </div>
            </div>

            <UploadForm imageState={[images, setImages]}/>

            <div className="gallery-body">
                {images.map((image, index) => {
                    
                    return (
                        <div 
                            className="img-container"
                            image={"/" + image}
                            key={index}
                            style={{
                                backgroundImage: `url(${"/" + image})`
                            }}
                            onClick={handleClick}
                        >
                            <div 
                                className="img-container-cover"
                                onClick={handleClick}
                            >
                            </div>
                        </div>
                    )
                })}
            </div>
            {modal}
        </div>
    )
}

export default Gallery;