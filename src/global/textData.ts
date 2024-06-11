export const websiteInformationData = {
    headerText: "Online Notes",
    paragraphs: [
        "Welcome to Online Notes - your personalized digital space for effortless note-taking and organization! With our user-friendly platform, registering and logging in is a breeze, granting you immediate access to creating, saving, sorting your notes seamlessly.",
        "Empowering you to capture your thoughts, ideas, and important information, Online Notes offers a versatile environment - Whether you're jotting down meeting notes, drafting creative concepts, or simply keeping track of your to-dos, our intuitive interface ensures your notes are easily retrievable whenever you need them.",
    ],
    imageURLS: [
        "images/Temp-notes.jpg",
        "images/Temp-notes2.jpg",
    ],
};

export const warningMessages = {
    PasswordsNotEqual: "The passwords you entered do not match. Please try again.",
    ShortPassword: "The password must have at least 8 characters.",
    PasswordMissingDigit: "The password must contain at least one digit",
    PasswordMissingLowerCaseCharacter: "Password must contain at least one lower case character",
    PasswordMissingUpperCaseCharacter: "Password must contain at least one upper case character",
    ShortUsername: "The username must contain at least 6 characters",
};

export const RegistrationMessages = {
    success: {
        header: "Account successfully created !",
        text: "Login to your account by going to the login page.",
    },
    error: {
        header:"Error !",
        text:"Looks like there was an issue creating your account, please try again later."
    },
    usernameTaken: {
        header:"Username taken",
        text:"The specified username is already in use. Please choose another one."
    },
    emailTaken: {
        header:"Email taken",
        text:"The specified email is already in use. Please choose another one."
    }
};

export const LoginMessages = {
    incorrectCredentials: {
        header: "Incorrect Credentials",
        text: "The entered username or password doesnt match"
    },
    error: {
        header: "Error",
        text: "Looks like there was an issue, try again later."
    },
    serverError: {
        header: "Server Error",
        text: "Looks like something when wrong, pleasy try again later."
    }
}