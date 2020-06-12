import React, { useEffect, useState } from "react"
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import NavBar from '../nav/NavBar';
import VotesList from '../votes/listVotes/listVote'
import '../dashboard/DashboardMain.scss'

const Dashboard = () => {
    return (
        <>
        <NavBar />
        <VotesList />
        </>
        

    )
}


export default Dashboard;
