import React, { useEffect, useState } from "react"
import API from '../../../api/api';
import "react-datepicker/dist/react-datepicker.css";
import LoadingScreen from 'react-loading-screen';
import VoteDetails from '../voteDetails/voteDetails'

import './listVote.scss';

const VotesList = () => {
    const [votes, setVotes] = useState([]);
    const [currentVote, setCurrentVore] = useState();

    useEffect(() => {
        API.getAllVotes().then((resp) => {
            setVotes(resp.data);
        })
    }, []);


    const openVote = (vote) => {
        setCurrentVore(vote)
    }
    return (
        <>
            {currentVote ? <VoteDetails vote={currentVote} setVote = {() => setCurrentVore()} /> :
                <div className="votes-list">
                    <h1>Голосування</h1>
                    <LoadingScreen
                        loading={!votes}
                        bgColor='#f1f1f1'
                        spinnerColor='#9ee5f8'
                        textColor='#676767'
                        text='Братва вже рішає!'
                    >

                        <div className="list">
                            {votes.map((item, key) => (
                                <div className="vote" onClick={() => openVote(item)}>
                                    <div className={item.type === "International" ? `vote-header blue` : `vote-header green`}>
                                        <h1>{item.type === "International" ? "Державне" : "Місцеве"} </h1>
                                    </div>

                                    <div className="vote-content">
                                        <h1 className="card-title">{item.title}</h1>

                                        <div className="labels">
                                            <div className="number">
                                                {"Номер: " + item.id.slice(item.id.length - 5)}
                                            </div>
                                            <div className="type">
                                                {item.anonym ? "Анонімне голосування" : "Публічне голосування"}
                                            </div>
                                        </div>

                                        <div className="duration">
                                            <span>Тривалість: </span>
                                            <span className="date">{`з  ${new Date(item.startDate).toLocaleDateString()} до ${new Date(item.endDate).toLocaleDateString()}`}</span>
                                        </div>

                                    </div>

                                </div>

                            ))}
                        </div>

                    </LoadingScreen>
                </div>
            }
        </>


    )
}


export default VotesList;
