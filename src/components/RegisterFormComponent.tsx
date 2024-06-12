import Form from "./FormComponent"
import Header from "./HeaderComponent"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import InformationBox from "./InformationBoxComponent"

import React, { useState } from "react"
import { warningTypes } from "../global/variables"
import { warningMessages } from "../global/textData"
import { informationTypes } from "../global/variables"
import { registrationStatusTypes } from "../global/variables"
import { RegistrationMessages } from "../global/textData"

export default function RegisterForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [warningStatus, setWarningStatus] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState("");
    let informationType = "";
    let informationText = "";
    let informationHeader = "";

    function DoInputsMeetRequirements() {

        if (username.length < 6){
            setWarningStatus(warningTypes.ShortUsername);
            return false;
        }

        if (password.length < 8){
            setWarningStatus(warningTypes.ShortPassword);
            return false;
        }

        if (!/\d/.test(password)){
            setWarningStatus(warningTypes.PasswordMissingDigit);
            return false;
        }

        if (!/[a-z]/.test(password)){
            setWarningStatus(warningTypes.PasswordMissingLowerCaseCharacter);
            return false;
        }

        if (!/[A-Z]/.test(password)){
            setWarningStatus(warningTypes.PasswordMissingUpperCaseCharacter);
            return false;
        }

        if (password !== repeatPassword){
            setWarningStatus(warningTypes.PasswordsNotEqual);
            return false;
        }

        if(warningStatus) setWarningStatus("");

        return true;
    }

    function checkWarningStatus() {
        if (!warningStatus) return;


        informationHeader = "Warning";
        informationType = informationTypes.warning;

        console.log("Checking warning status function - " + warningStatus);
        if (warningStatus === warningTypes.ShortPassword) informationText = warningMessages.ShortPassword;
        if (warningStatus === warningTypes.PasswordMissingDigit) informationText = warningMessages.PasswordMissingDigit
        if (warningStatus === warningTypes.PasswordMissingLowerCaseCharacter) informationText = warningMessages.PasswordMissingLowerCaseCharacter
        if (warningStatus === warningTypes.PasswordMissingUpperCaseCharacter) informationText = warningMessages.PasswordMissingUpperCaseCharacter;
        if (warningStatus === warningTypes.PasswordsNotEqual) informationText = warningMessages.PasswordsNotEqual;
        if (warningStatus === warningTypes.ShortUsername) informationText = warningMessages.ShortUsername;
    }

    function checkRegistrationStatus() {
        if (!registrationStatus || warningStatus) return;

        if (registrationStatus === registrationStatusTypes.success) {
            informationType = informationTypes.success;
            informationHeader = RegistrationMessages.success.header;
            informationText = RegistrationMessages.success.text;
        }

        if (registrationStatus === registrationStatusTypes.error) {
            informationType = informationTypes.error;
            informationHeader = RegistrationMessages.error.header;
            informationText = RegistrationMessages.error.text;
        }

        if (registrationStatus === registrationStatusTypes.usernameTaken) {
            informationType = informationTypes.warning;
            informationHeader = RegistrationMessages.usernameTaken.header;
            informationText = RegistrationMessages.usernameTaken.text;
        }

        if (registrationStatus === registrationStatusTypes.emailTaken) {
            informationType = informationTypes.warning;
            informationHeader = RegistrationMessages.emailTaken.header;
            informationText = RegistrationMessages.emailTaken.text;
        }
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Handling sumbit, warning status before function is " + warningStatus);

        if ( !DoInputsMeetRequirements() ) return;

        console.log("Handling sumbit, warning status after function is " + warningStatus);
        if (warningStatus) return;
        console.log("warning status empty so trying to register user..");

        const FormData =
        {
            username: username,
            email: email,
            password: password,
        };

        try
        {
            fetch
            (
                "http://localhost:3000/api/register",
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify({FormData})
                }
            )
            .then(async (res) => {
                if (res.ok) {
                    const response = await res.json();
                    const {status} = response;

                    if (status === 1) setRegistrationStatus(registrationStatusTypes.success);
                    if (status === 2) setRegistrationStatus(registrationStatusTypes.error);
                    if (status === 3) setRegistrationStatus(registrationStatusTypes.usernameTaken);
                    if (status === 4) setRegistrationStatus(registrationStatusTypes.emailTaken);
                }
            })
            .catch(() => {
                setRegistrationStatus(registrationStatusTypes.error);
            })
        }
        catch{
            setRegistrationStatus(registrationStatusTypes.error);
        }
    }

    checkWarningStatus();
    checkRegistrationStatus();

    return (
        <Form onSubmit={handleSubmit}>
            <Header text="Register"/>
            <Label htmlFor="username" text="Username"/>
            <InputText type="text" id="username" name="username" value={username} onChange={handleUsernameChange} isRequired={true} maxLenght={32}/>
            <Label htmlFor="email" text="Email"/>
            <InputText type="email" id="email" name="email" value={email} onChange={handleEmailChange} isRequired={true}/>
            <Label htmlFor="password" text="Password"/>
            <InputText type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isRequired={true} maxLenght={64}/>
            <Label htmlFor="repeatPassword" text="Repeat password"/>
            <InputText type="password" id="repeatPassword" name="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} isRequired={true} maxLenght={64}/>
            <InputButton type="submit" value="Register"/>
            {informationText ? <InformationBox header={informationHeader} text={informationText} type={informationType}/> : null}
        </Form>
    )
}