import ImagePreview from "./ImagePreviewComponent"
import { useState, useEffect } from "react"
import "../css/ImagesComponent.css"

import { userSearchData } from "../utils/userSearchData"

export default function Images() {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [IDList, setIDLIST] = useState<bigint[]>([]);
    const [areIDsLoaded, setAreIDsLoaded] = useState(false);

    let search = userSearchData.getSearchData();
    let images

    async function getImageIDs() {
        try {
            fetch(
                "http://localhost:3000/search", 
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify({search})
                }
            )
            .then ( async (res) => {
                if (res.ok) {
                    const response = await res.json();
                    const {IDs} = response;
                    setIDLIST(IDs);
                    setAreIDsLoaded(true);
                }
            })
            .catch((err) => { return; })
        }
        catch {return;}
    }

    if (!areIDsLoaded) getImageIDs();
    
    
    if (areIDsLoaded) images = IDList.map((id) => <ImagePreview key={id} id={id} />);
    
    return (
        <> 
            <div className="images">
                {areIDsLoaded && images ? images : null}
            </div>
        </>
    )
}