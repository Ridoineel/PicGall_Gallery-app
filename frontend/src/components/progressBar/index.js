
const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <div 
                className="progress-bar-content"
                style={{
                    width: props.width,
                    backgroundColor: props.color,
                }}
            >
                
            </div>

        </div>
    )
}

export default ProgressBar;