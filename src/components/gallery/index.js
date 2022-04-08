import {useState, useEffect} from "react";
import UploadForm from "../uploadForm"
import ImageModal from "../imageModal";
import axios from "axios";

function Gallery() {
    let [images, setImages] = useState([]);
    let [modal, setModal] = useState(null);
    let [deletionAction, setDeletionAction] = useState(0);

    const handleModalReqClick = (event) => {
        let image = event.target.parentNode.getAttribute("image");

        if (image) {
            setModal(<ImageModal url={image} setModal={setModal} />)
        }
    }



    const deleteAllHandleClick = async (event) => {
        // delete all images requests
        let res;

        try {
            res = await axios.delete("http://localhost:8080/images");
            
            if (res.status === 200) {
                setImages([])
            }
        } catch (error) {
            console.log(error);
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
                    Lorem Ipsum dolor sit amet, 
                    consecteur adipiscing elit.
                </div>
            </div>

            <UploadForm imagesState={[images, setImages]}/>

            <div className="text-right">
                <button 
                    className="btn btn-danger btn-outlined"
                    onClick={deleteAllHandleClick}
                >
                    Delete all image
                </button>
            </div>
            
            <div className="gallery-body">
                {images.map((image, index) => {
                    return (
                        <div 
                            className="img-container"
                            image={image}
                            imgindex={index}
                            key={index}
                            style={{
                                backgroundImage: `url(${image})`
                            }}
                        >
                        
                            {/* cover container */}

                            <div 
                                className="img-container-cover"
                                onClick={handleModalReqClick}
                            >
                            </div>   

                             {/* deletion button */}

                            <span 
                                imgindex={index} 
                                onClick={deleteOneHandleClick}
                                className="btn img-del-button"
                            >
                                x
                            </span>                         
                        </div>
                    )
                })}
            </div>
            {modal}
        </div>
    )
}

export default Gallery;