import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import  SignIn from '../components/login/SignIn/signIn';
import  SignUp from '../components/login/SignUp/signUp';
import Dashboard from '../components/dashboard/DashboardMain';
import CreateVote from '../components/votes/createVote/createVote'
const MainRouter = (
    <Router>
        <Switch>
            <Route exact path="/sign_in" component={SignIn}/>
            <Route exact path="/sign_up" component={SignUp}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/new" component={CreateVote}/>
         </Switch>
    </Router>
    )

export default MainRouter;