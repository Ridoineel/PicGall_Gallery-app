import { useState } from "react";
import axios from "axios";


function UploadForm(props) {
    let [file, setFile] = useState(null);
    let [error, setError] = useState(null);
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
                //setImages([selectedFile.name, ...images]);
                
                let fd = new FormData();

                fd.append("image", selectedFile, selectedFile.name);

                try {
                    res = await axios.post("http://localhost:8080/images", fd);
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
        <div>
             <form>
                <label>
                    <input 
                        type="file" 
                        onChange={handleChange} 
                        className="file-input"
                    />
                    <span className="file-input-label">+</span>
                </label>

                {error && <div className="error-panel">{error}</div>}
                {file && <div>{file.name}</div>}
            </form>
        </div>      
    )
}

export default UploadForm;