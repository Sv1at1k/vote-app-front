import React, { useEffect, useState } from "react"
import { Formik } from "formik";
import Errors from '../../../addons/Errors/validationErrors';
import { newVoteValidtions } from "../../../const/validaitons"
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../nav/NavBar';
import API from '../../../api/api';
import voteTypes from '../../../const/voteTypes';
import anonymTypes from '../../../const/anonymType';
import DatePicker from "react-datepicker";
import ImgBuilder from '../../../addons/img/ImgBuilder';
import "react-datepicker/dist/react-datepicker.css";
import LoadingScreen from 'react-loading-screen';
import './voteDetails.scss';

const VoteDetails = ({ vote, setVote }) => {
    const history = useHistory();
    const [options, setOptions] = useState([]);
    const [currentUserId, setCurrentUserRole] = useState(JSON.parse(localStorage.getItem('token')).id);

    useEffect(() => {
        vote.voteWithPriority ?
            API.getPriotityVoteParams().then(resp => {
                setOptions(resp.data);
                console.log(resp)
            }) :

            API.getVoteParams().then(resp => {
                setOptions(resp.data);
                console.log(resp)
            })

    }, []);

    const goBack = () => {
        setVote(null)
    }


    const voteDetails = (item) => {
        if (vote.anonym) {
            return "Анонімно"
        } else {
            if (vote.voteWithPriority) {
                return 0.0
            } else {
                return item.user_ids ? item.user_ids.length : 0;
            }
        }
    }

    const voteZa = () => {
        options[0].user_ids.push(currentUserId)
        const data = options[0];

        API.makeVote(options[0].id,data).then(resp => {
            history.push("dashboard")
        })
    }

    const voteProty = () => {
        options[1].user_ids.push(currentUserId)
        const data = options[1];
        API.makeVote(options[1].id,data).then(resp => {
            history.push("dashboard")
        })
    }

    const userCanVote = () => {
            return options.map((item) => {
                if (item.user_ids.indexOf(currentUserId) === -1) {
                    return true
                } else {
                    return false
                }
            }) 


    }

        return (
            <div className="vote-details-wrapper">
                <span
                    onClick={() => goBack()}
                    className="go-back"
                >Go back</span>
                <div className="header">
                    <h1 className="title">{vote.title}</h1>
                     <span className = "description">{vote.description}</span>
                    <div className="labels">
                        <div className="number">
                            {"Номер: " + vote.id.slice(vote.id.length - 5)}
                        </div>
                        <div className="type">
                            {vote.anonym ? "Анонімне голосування" : "Публічне голосування"}
                        </div>

                        <div className="votes">
                            {options ? options.map((item) => (
                                <div>
                                    <span style={{ color: "#4A9EDB" }}>Голосів за </span>
                                    <span style={{ color: "#66A32C" }}>{item.option + " "}</span>
                                    <span style={{ fontWeight: "bold" }}>{voteDetails(item)}</span>
                                </div>
                            )): ""}
                        </div>
                    </div>
                </div>

                <div className="content">
                    {userCanVote ?
                        <div>
                            {vote.voteWithPriority ? <h1>In progress</h1>
                                : 
                                <div className = "no-priority">
                                    <img src = {ImgBuilder.za}
                                     onClick = {() => {
                                        voteProty();
                                    }} />
                                    <img 
                                    src = {ImgBuilder.proty}
                                    onClick = {() => {
                                        voteZa()
                                    }}
                                    />
                                </div>
                            }
                        </div> :
                        <div className="voted">Ви вже проголосували!</div>}
                </div>

            </div>
        )
}


export default VoteDetails;
