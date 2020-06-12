import * as Yup from "yup";

export const registerValdiations = () => {
   return  Yup.object().shape({
        username: Yup.string().required("Еййй, заповни мене"),
        password: Yup.string().required("Еййй, заповни мене"),

        confirm_password: Yup.string().required("Еййй, заповни мене")
            .when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Брат у тебе паролі не співпадають"
                )
            })
    })
}


export const signInValidations = () => {
    return  Yup.object().shape({
         username: Yup.string().required("Еййй, заповни мене"),
         password: Yup.string().required("Еййй, заповни мене"),
     })
 }

 export const newVoteValidtions = () => {
    return  Yup.object().shape({
         title: Yup.string().required("Еййй, заповни мене"),
     })
 }