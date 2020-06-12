const  signUpFields = [
    {
        id:"email",
        label: "Email",
        placeholder: "Email",
        inputType: "text",
        type: "input"
    },
    {
        id:"password",
        label: "Password",
        placeholder: "Password",
        inputType: "password",
        type: "input"
    },
    {
        id:"confirm_password",
        label: "Confirm password",
        placeholder: "Confirm password",
        inputType: "password",
        type: "input"
    }
];

export const signUpFieldsDefaultValues = {
    email: "",
    password : "",
    confirm_password: ""
}

export default signUpFields;