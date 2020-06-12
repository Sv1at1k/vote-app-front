import React, { useEffect, useState } from "react"
import { Formik } from "formik";
import { Link,useHistory } from 'react-router-dom'
import Errors from '../../../addons/Errors/validationErrors';
import { registerValdiations } from "../../../const/validaitons"
import API from '../../../api/api'
const SignUp = () => {
    const [serverError,setServerError] = useState("");
    const history = useHistory();

    const onSumbit = (data) => {
        API.sign_up(data).then((resp)=> {
            if(!resp.id){
                console.log(resp.username);
                localStorage.setItem('token', JSON.stringify(resp.data));
                history.push("dashboard")
            }else {
                setServerError("Такий брат вже є у мережі!!!")
            }
        }).catch((erorr) => {
            console.log(erorr);
            setServerError("Брат, лінивий брат який писав бек не обробляє цю помилку, спробуй ще раз, а ще я не поміщаюсь в блок ))))!")
        })
    }
    return (
        <div className="login-wrapper threed">
            <h1>Зареєструватись</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    confirm_password: "",
                    role: "user"
                }}
                onSubmit={values => {
                    onSumbit(values);
                }}
                validationSchema={registerValdiations}
            >
                {props => {
                    const { values, touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit, } = props;
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

                            </div>

                            <div className="item">
                                <label>Confirm password</label>
                                <input
                                    id="confirm_password"
                                    placeholder="Confirm password"
                                    type="password"
                                    value={values.confirm_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Errors error={errors.confirm_password} touched={touched.confirm_password} />
                                <Errors error={serverError} touched={serverError} />
                            </div>

                            <div className="item">
                                <label >Ти хто по жизні брат?</label>
                                <div className = "radio">
                                <span>Електорат</span>
                                    <input
                                        type="radio"
                                        id="user"
                                        defaultChecked={values.role === "user"}
                                        name="role"
                                        value="user"
                                        onChange={() => setFieldValue("role", "user")}
                                    />

                                </div>
                                <div className = "radio">
                                    <span>Іліта</span>
                                    <input
                                        type="radio"
                                        id="admin"
                                        defaultChecked={values.role === "admin"}
                                        name="role"
                                        value="user"
                                        onChange={() => setFieldValue("role", "admin")}
                                    />
                                </div>

                            </div>

                            <button type="submit">
                            Зареєструватись
                            </button>
                            
                        </form>
                    );
                }}
            </Formik>
        </div>

    )
}


export default SignUp;
