import Data from "./DataDisplayComponent";
import Container from "./ContainerComponent";

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

import "../css/ImageFullViewComponent.css"

export default function ImageFullView() {
    const { id } = useParams<{ id: string }>();
    const [imageURL, setImageURL] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (id) fetchImageFile(BigInt(id));
    }, [id]);

    async function fetchImageFile(id: bigint) {
        try {
            const responseImage = await fetch(`http://localhost:3000/images/${id}`);
            const responseImageData = await fetch(`http://localhost:3000/images-data/${id}`);
            
            if (!responseImage.ok || !responseImageData.ok) return null;

            const blob = await responseImage.blob();
            const imageData = await responseImageData.json();
            const {title, user_id,timestamp} = imageData;

            const url = URL.createObjectURL(blob);
            setImageURL(url);
            
            setTitle(title);
            setUser(user_id);
            setDate(timestamp);
        } catch {
            return null;
        }
    }
    
    return (
        <>  
           
            {imageURL ?  <div className="image-full"> <img src={imageURL} alt="" className="image-container"></img> </div>: null}
           
           <Container>
                <Data dataName="Image title" data={title}/>
                <Data dataName="Uploaded by" data={user} /> 
                <Data dataName="Upload date" data={date} /> 
           </Container>
           
        </>
    )
}