import React, { useEffect, useState } from "react"
import { Formik } from "formik";
import HeadRoom from 'react-headroom'
import { Link,useHistory } from 'react-router-dom';
import ImgBuilder from '../../addons/img/ImgBuilder';

import '../nav/NavBar.scss'

const NavBar = () => {
    const history = useHistory();
    const [currentUserRole,setCurrentUserRole] = useState(JSON.parse(localStorage.getItem('token')).role);



    return (
        <div className="container-fluid sticky">
            <HeadRoom>
                <div className="header ">
                    <div className="city">
                        <img src={ImgBuilder.place}></img>
                        <div className="place">
                            <span className = "title">Місто</span>
                            <span>Львів</span>
                        </div>

                    </div>
                    <div className="buttons">
                       <span onClick = {()=> history.push("dashboard")}>Голосування</span>
                       {currentUserRole === "admin" ? 
                        <span onClick = {()=> history.push("new")}>Добавити голосування</span> : 
                        <span>Мої голоси</span>
                        }
                     </div>
                    <div onClick = {()=> history.push('/sign_in')} className="exit">
                        <img src={ImgBuilder.exit}></img>
                     </div>

                </div>

            </HeadRoom>
        </div>

    )
}


export default NavBar;
