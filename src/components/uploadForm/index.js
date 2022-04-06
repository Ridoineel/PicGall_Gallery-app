import { useState } from "react";


function UploadForm() {
    let [file, setFile] = useState(null);
    let [error, setError] = useState(null);
    let [images, setImages] = useState([]);

    const types = ["image/png", "image/jpeg", "image/gif"];

    function handleChange(event) {
        let input = event.target
        let selectedFile = input.files[0];
        let fileType;

        if (selectedFile) {
            fileType = selectedFile.type;

            if (types.indexOf(fileType) != -1) {
                // file type is valid
                setFile(selectedFile)
                setError(null)
                setImages([...images, selectedFile.name]);
            }else {
                // file type is invalid
                setFile(null)
                setError("Please select an image file (png or jpeg");
                // setImage(null);
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

           

            {images.map((image, index) => {
                return <img key={index} src={"/" + image} className="image" />
            })}
            
        </div>
       
    )
}

export default UploadForm;