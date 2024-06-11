import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import Form from "./FormComponent"
import Header from "./HeaderComponent"
import React, { useState } from "react"
import InformationBox from "./InformationBoxComponent"
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
        setWarningStatus("");

        if (username.length < 6){
            setWarningStatus(warningTypes.ShortUsername);
            return;
        }

        if (password.length < 8){
            setWarningStatus(warningTypes.ShortPassword);
            return;
        }

        if (!/\d/.test(password)){
            setWarningStatus(warningTypes.PasswordMissingDigit);
            return
        }

        if (!/[a-z]/.test(password)){
            setWarningStatus(warningTypes.PasswordMissingLowerCaseCharacter);
            return;
        }

        if (!/[A-Z]/.test(password)){
            setWarningStatus(warningTypes.PasswordMissingUpperCaseCharacter);
            return;
        }

        if (password !== repeatPassword){
            setWarningStatus(warningTypes.PasswordsNotEqual);
            return;
        }

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

    if (warningStatus.length > 0) {
        informationType = informationTypes.warning;
        informationHeader = "Warning";
        if (warningStatus === warningTypes.ShortPassword) informationText = warningMessages.ShortPassword;
        if (warningStatus === warningTypes.PasswordMissingDigit) informationText = warningMessages.PasswordMissingDigit
        if (warningStatus === warningTypes.PasswordMissingLowerCaseCharacter) informationText = warningMessages.PasswordMissingLowerCaseCharacter
        if (warningStatus === warningTypes.PasswordMissingUpperCaseCharacter) informationText = warningMessages.PasswordMissingUpperCaseCharacter;
        if (warningStatus === warningTypes.PasswordsNotEqual) informationText = warningMessages.PasswordsNotEqual;
        if (warningStatus === warningTypes.ShortUsername) informationText = warningMessages.ShortUsername;
    }

    if (registrationStatus.length > 0) {
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
            {informationText.length > 0 ? <InformationBox header={informationHeader} text={informationText} type={informationType}/> : null}
        </Form>
    )
}