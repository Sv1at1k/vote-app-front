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
import ImgBuilder from '../../../addons/img/ImgBuilder'
import "react-datepicker/dist/react-datepicker.css";
import './createVote.scss';

const startVotePapams = [
    {
        option: "",
        id: 1
    },
    {
        option: "",
        id: 2
    }
]
const CreateVote = () => {
    const history = useHistory();
    const [voteWithPriority, setVoteWithPriority] = useState(false);
    const [voteParams, setVoteParams] = useState(startVotePapams);
    const [currentUserId,setCurrentUserRole] = useState(JSON.parse(localStorage.getItem('token')).id);

    const onSumbit = (data) => {
        voteParams.map(item => {
            data.voteOptions.push(item.option)
        })
        data.voteWithPriority = voteWithPriority;

        API.createVote(data).then(resp => {
            history.push("dashboard")
        });

    }


    const removeParam = (id) => {
        setVoteParams(voteParams.filter(item => item.id !== id));
    }

    const addParam = () => {
        setVoteParams(prev => [...prev, { option: "", id: voteParams.length + 1 }]);
    }

    const handleVoteOptionChange = (value,key) => {
        const newVotes = [...voteParams];
        let currentVote = { ...newVotes[key] };
        currentVote.option = value;
        newVotes[key] = currentVote;
        setVoteParams(newVotes);
    }
    return (
        <>
            <NavBar />
            <div className="create-vote-wrapper">
                <h1 className="form-title">Добавити голосування</h1>
                <Formik
                    initialValues={{
                        createdBy : currentUserId,
                        title: "",
                        type: "national",
                        anonym: false,
                        startDate: new Date(),
                        endDate: new Date(),
                        description: "",
                        canChangeVote: false,
                        voteWithPriority:false,
                        voteOptions : []
                    }}
                    onSubmit={values => {
                        onSumbit(values);
                    }}
                    validationSchema={newVoteValidtions}
                >
                    {props => {
                        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="item">
                                    <label>Заголовок голосування</label>
                                    <input

                                        id="title"
                                        placeholder="Заголовок голосування"
                                        type="text"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Errors className="error" error={errors.title} touched={touched.title} />

                                </div>
                                <div className="item">
                                    <label>Тип голосування</label>
                                    <select
                                        name="color"
                                        value={values.type}
                                        onChange={(e) => {
                                            setFieldValue("type", e.target.value)
                                        }}
                                        onBlur={handleBlur}
                                    >
                                        {voteTypes.map((item) => (
                                            <option value={item.value} label={item.label} />
                                        ))}
                                    </select>

                                </div>

                                <div className="item">
                                    <label>Анонімність голосування</label>
                                    <select
                                        name="color"
                                        value={values.anonym}
                                        onChange={(e) => {
                                            setFieldValue("anonym", e.target.value)
                                        }}
                                        onBlur={handleBlur}
                                    >
                                        {anonymTypes.map((item) => (
                                            <option value={item.value} label={item.label} />
                                        ))}
                                    </select>

                                </div>
                                <div className="item">
                                    <label>Початок голосування</label>
                                    <DatePicker
                                        className="date-picker"
                                        selected={values.startDate}
                                        onChange={(date) => {
                                            setFieldValue("startDate", date)
                                        }}
                                    />


                                </div>

                                <div className="item">
                                    <label>Кінець голосування</label>
                                    <DatePicker
                                        className="date-picker"
                                        selected={values.endDate}
                                        onChange={(date) => {
                                            setFieldValue("endDate", date)
                                        }}
                                    />

                                </div>

                                <div className="item">
                                    <label>Зміна вибраного голосу</label>
                                    <input
                                        id="title"
                                        type="checkbox"
                                        defaultChecked={values.canChangeVote}
                                        onChange={(e) => {
                                            values.canChangeVote = !values.canChangeVote
                                        }}
                                    />

                                    <label>Голосування з вибором пріоритетності</label>
                                    <input
                                        id="title"
                                        type="checkbox"
                                        defaultChecked={voteWithPriority}
                                        onChange={(e) => {
                                            setVoteWithPriority(!voteWithPriority);
                                        }}
                                    />
                                </div>
                                <div className="vote-options">
                                    {voteWithPriority ?
                                        voteParams.map((item, key) => (
                                            <>
                                                <div className="vote-param" key={key}>
                                                    <input
                                                        id="title"
                                                        placeholder="Введіть опцію для голосування"
                                                        type="text"
                                                        value={item.option}
                                                        onChange={(e) => {
                                                            handleVoteOptionChange(e.target.value,key)
                                                           
                                                        }}
                                                    />
                                                    <img src={ImgBuilder.remove} onClick={() => {
                                                        removeParam(item.id);
                                                    }} />
                                                </div>

                                            </>
                                        )) : ""}
                                    {voteWithPriority ?
                                        <div className="add" onClick={() => { addParam() }}>
                                            <img src={ImgBuilder.add} />
                                            <span>Додати</span>
                                        </div> : ""}
                                </div>

                                <div className="item">
                                    <label>Опис</label>
                                    <textarea
                                        id="description"
                                        placeholder="Заголовок голосування"
                                        type="text"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                </div>


                                <div style={{ display: "flex" }}>
                                    <button type="submit">
                                        Добавити голосування
                                    </button>
                                    <button className="cancel">
                                        Скасувати
                                    </button>
                                </div>
                            </form>
                        );

                    }}
                </Formik>
            </div>

        </>


    )
}


export default CreateVote;
