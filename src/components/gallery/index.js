import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import UploadForm from "../uploadForm"
import ImageModal from "../imageModal";
import axios from "axios";

function Gallery() {
    let [images, setImages] = useState([]);
    let [modal, setModal] = useState(null);

    const handleModalReqClick = (event) => {
        let image = event.target.getAttribute("image");

        if (image) {
            setModal(<ImageModal url={image} setModal={setModal} />)
        }

        console.log(images)
    }



    const deleteAllHandleClick = async (event) => {
        // delete all images requests
        let confirmation = true
        let res;

        if (confirmation) {
            try {
                res = await axios.delete("http://localhost:8080/images");
                
                if (res.status === 200) {
                    setImages([])
                }
            } catch (error) {
                console.log(error);
            }   
        }
    }

    const deleteOneHandleClick = async (event) => {
        // delete images requests
        let res;
        let imgIndex = event.target.getAttribute("imgindex");
        let imgUrl = images[imgIndex];
        let imgFileName;
        let images_cp = images.slice(0);

        imgFileName = imgUrl.split("/").pop();

        try {
            res = await axios.delete("http://localhost:8080/images/" + imgFileName);
            
            if (res.status === 200) {
                // remove image url in iamges_cp
                images_cp.splice(imgIndex, 1);

                // update images state
                setImages(images_cp);
            }
        } catch (error) {
            console.log(error);
        }   
    }


    useEffect(() => {
        (async () => {
            // load images

            let res;
            let imagesList;

            try {
                res = await axios.get("http://localhost:8080/images");
                
                if (res.status === 200) {
                    imagesList = res.data
                    imagesList.reverse()

                    setImages(imagesList)
                }
            }catch (err) {
                console.log(err)
            }
        })()
        
    }, [])

    return (
        <div className="gallery">
            <div className="gallery-header">
                <h1>Your Pictures</h1>

                <div>
                    Lorem Ipsum dolor sit amet, a description...
                </div>
            </div>

            <UploadForm imagesState={[images, setImages]}/>

            <div className="text-right">
                <button 
                    className="btn btn-danger btn-outlined"
                    onClick={deleteAllHandleClick}
                >
                    Delete all images
                </button>
            </div>
            
            <div className="gallery-body">
                {images.map((image, index) => (
                    <motion.div 
                        layout
                        initial={{opacity: 0.85}}
                        whileHover={{scale: 1.02, opacity: 1, rotate: 1}}
                       
                        className="img-container"
                        image={image}
                        imgindex={index}
                        key={index}
                        onClick={handleModalReqClick}
                        style={{
                            backgroundImage: `url("${image}")`
                        }}
                    >
                        {/* deletion button */}
                        <span 
                            imgindex={index} 
                            onClick={deleteOneHandleClick}
                            className="btn img-del-button"
                        >
                            x
                        </span>                         
                    </motion.div>
                ))}
            </div>
            {modal}
        </div>
    )
}

export default Gallery;