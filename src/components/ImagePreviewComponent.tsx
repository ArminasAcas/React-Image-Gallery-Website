import { useState, useEffect } from "react"
import "../css/ImagePreviewComponent.css"

export default function ImagePreview(props:{ id:bigint}) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        setIsImageLoaded(false);
        fetchImageFile(props.id);
    }, [props.id]);

    async function fetchImageFile(id: bigint) {
        try {
            const response = await fetch(`http://localhost:3000/images/${id}`);
            if (!response.ok) return null;
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageURL(url);
            setIsImageLoaded(true);
        } catch {
            return null;
        }
    }
    
    return (
        <>
            <a className="image" href={"/image/" + props.id}>
                 {isImageLoaded && imageURL ? <img src={imageURL} alt="" className="image-container"></img>: null} 
            </a>
        </>
    )
}