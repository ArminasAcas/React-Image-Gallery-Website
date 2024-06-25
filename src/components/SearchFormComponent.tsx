import Form from "./FormComponent"
import Header from "./HeaderComponent"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import InformationBox from "./InformationBoxComponent"
import Button from "./ButtonComponent"
import InputDate from "./InputDateComponent"

import { useEffect, useState } from "react"
import { informationTypes } from "../global/variables"
import { Navigate } from "react-router-dom"
import { userSearchData } from "../utils/userSearchData"

export default function SearchForm() {

    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [startDate, setStartDate] = useState (new Date());
    const [endDate, setEndDate] = useState (new Date());
    const [user, setUser] = useState("");
    const [areSettingsExpanded, setAreSettingsExpanded] = useState(false);
    const [navigateToGallery, setNavigateToGallery] = useState(false);
    const [dateParameterIsChanged, setDateParameterIsChanged] = useState(false);
    let inputButtonText = (areSettingsExpanded ? "Hide extra settings" : "Show extra settings");

    useEffect( () => {
        setDateParameterIsChanged(true);
    }, [startDate, endDate])
    
    function handleTitleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleTagChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTags(e.target.value);
    }

    function handleExpandSettingsButtonClick () {
        setAreSettingsExpanded(!areSettingsExpanded);
    }

    function handleDateStartChange(e : React.ChangeEvent<HTMLInputElement>) {
        setStartDate(new Date(e.target.value));
    }

    function handleDateEndChange(e : React.ChangeEvent<HTMLInputElement>) {
        setEndDate(new Date(e.target.value));
    }

    function handleUserChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUser(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!dateParameterIsChanged) userSearchData.setSearchData(title, tags, user);
        userSearchData.setSearchData(title, tags, user, startDate, endDate);

        setNavigateToGallery(true);
    }

    if (navigateToGallery) {
        return <Navigate to="/Gallery" replace />;
    }

    console.log(dateParameterIsChanged);

    const extraSettings = (
        <>
            <Label htmlFor="dateStart" text="From Date" />
            <InputDate id="dateStart" name="dateStart" onChange={handleDateStartChange} value ={startDate}/>
            <Label htmlFor="dateEnd" text="To Date" />
            <InputDate id="dateEnd" name="dateEnd" onChange={handleDateEndChange} value ={endDate}/>
            <Label htmlFor="user" text="User" />
            <InputText type="text" id="user" name="user" value={user} onChange={handleUserChange}/>
        </>
    )

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Header text="Image Search"/>
                <Label htmlFor="title" text="Image Title" />
                <InputText type="text" id="title" name="title" value={title} onChange={handleTitleChange}/>
                <Label htmlFor="tags" text="Image Tags" />
                <InputText type="text" id="tags" name="tags" value={tags} onChange={handleTagChange}/>
                { areSettingsExpanded ? extraSettings : null }
                <Button text={inputButtonText} onClick={handleExpandSettingsButtonClick} variant="mini"/>
                <InputButton type="submit" value="Search Images" />
            </Form>
        </>
    )
}