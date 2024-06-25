import ImagePreview from "./ImagePreviewComponent"
import Header from "./HeaderComponent"
import Container from "./ContainerComponent"
import Data from "./DataDisplayComponent"
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
            <Container>
                <Header text="Search Settings"></Header>
                <Data dataName="Image title"  data={search.title}/>
                <Data dataName="Tags" data={search.tags} /> 
                <Data dataName="User" data={search.user} /> 
                <Data dataName="Search from date" data={search.startDate} /> 
                <Data dataName="Search to date" data={search.endDate} /> 
           </Container>

            <div className="images">
                {areIDsLoaded && images ? images : null}
            </div>
        </>
    )
}