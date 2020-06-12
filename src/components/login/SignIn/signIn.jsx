import React, { useEffect, useState } from "react"
import { Formik } from "formik";
import Errors from '../../../addons/Errors/validationErrors';
import { signInValidations } from "../../../const/validaitons"
import { Link,useHistory } from 'react-router-dom'
import API from '../../../api/api'


import '../../login/login.scss'
const SignIn = () => {
    const history = useHistory();
    const [serverError,setServerError] = useState("");


    const onSumbit = (data) => {
        API.sign_in(data).then((resp)=>{
            if(resp.data.id){
                localStorage.setItem('token', JSON.stringify(resp.data));
                history.push("dashboard")
            }else {
                setServerError("Брат, пароль невірний!")
            }
        }).catch((error)=>{
            setServerError("Брат, лінивий брат який писав бек не обробляє цю помилку, спробуй ще раз!")
        })
    }

    return (
        <div style = {{height : "300px"}} className="login-wrapper threed">
            <h1>Увійти</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={values => {
                    onSumbit(values);
                }}
                validationSchema={signInValidations}
            >
                {props => {
                    const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="item">
                                <label>Username</label>
                                <input
                                    id="username"
                                    placeholder="Username"
                                    type="text"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Errors error={errors.username} touched={touched.username} />

                            </div>

                            <div className="item">
                                <label>Password</label>
                                <input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Errors error={errors.password} touched={touched.password} />
                                <Errors error={serverError} touched={serverError} />
                            </div>

                            <button type="submit">
                                Увійти
                            </button>
                        
                            <Link to="/sign_up"  className= "tip">Зареєструватись</Link>
                            
                        </form>
                    );
                   
                }}
            </Formik>
        </div>

    )
}


export default SignIn;
