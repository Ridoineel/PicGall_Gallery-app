
const ImageModal = (props) => {
    const handleClick = (e) => {
        // click on modal div
        let tagName = e.target.tagName.toLowerCase();

        if (tagName === "div") {
            // hidde modal
            props.setModal(null)
        }
    }

    const handleDoubleClick = (e) => {
        // double click on modall image
        let tagName = e.target.tagName.toLowerCase();

        if (tagName === "img") {
            // hidde modal
            props.setModal(null)
        }
    }
    
    
    return (
        <div 
            className="image-modal" 
            onDoubleClick={handleDoubleClick} 
            onClick={handleClick}
        >
            <img src={props.url} alt="extended img" />
        </div>
    )
}

export default ImageModal