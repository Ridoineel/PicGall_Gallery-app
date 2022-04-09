import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProgressBar from "../progressBar";
import env from "../../env";


function UploadForm(props) {
    let [file, setFile] = useState(null);
    let [error, setError] = useState(null);
    let [progressValue, setProgressValue] = useState(0);
    let [images, setImages] = props.imagesState;

    const types = ["image/png", "image/jpeg", "image/gif"];

    async function handleChange(event) {
        let input = event.target
        let selectedFile = input.files[0];
        let fileType;
        let res;
        let imgUrl;

        if (selectedFile) {
            fileType = selectedFile.type;

            if (types.indexOf(fileType) !== -1) {
                // file type is valid
                setFile(selectedFile)
                setError(null)
                
                let fd = new FormData();
                fd.append("image", selectedFile, selectedFile.name);

                try {
                    res = await axios.post(env.BACKEND_DOMAIN + "/images", fd, {
                        onUploadProgress: progressEvent => {
                            console.log(Math.round((progressEvent.loaded / progressEvent.total)*100) + "%" )
                            setProgressValue(Math.round((progressEvent.loaded / progressEvent.total)*100));
                        }
                    });
                    imgUrl = res.data.image_url;

                    setImages([imgUrl, ...images]);
                }catch (err) {
                    console.log(err);
                }
            }else {
                setFile(null)
                setError("Please select an image file (png, jpeg or gif");
            }
        }
    }

    return (
        <div className="upload_form">
             <form>
                <label>
                    <input 
                        type="file" 
                        onChange={handleChange} 
                        className="file-input"
                    />

                    {/* Add button */}
                    <motion.span 
                        whileHover={{scale: 1.2, rotate: 180}}
                        className="file-input-label"
                    >
                        +
                    </motion.span>
                </label>

                {error && <div className="error-panel">{error}</div>}
                {file && <div>{file.name}</div>}

                {progressValue ? <ProgressBar width={progressValue+"%"} /> : null}
            </form>
        </div>      
    )
}

export default UploadForm;