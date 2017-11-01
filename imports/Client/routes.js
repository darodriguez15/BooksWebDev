import React, {Component} from "react";
import {Router, Route} from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory();

//Components

import mainPage from "./Components/mainPage";
import Task from "./Components/task/App";
import Book from "./Components/book/App";
import HomeUI from "./Components/globalUsuarioInvitado/homeUI";
import HomeUser from "./Components/globalusuariopro/home";
import UserBook from "./Components/userBook/App";
import Profile from "./Components/userBook/ProfileView";

export const renderRoutes = () => (

    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={mainPage}/>
            <Route path="/holi" component={Task}/>
            <Route path="/uiBooks" component={Book}/>
            <Route path="/ui" component={HomeUI}/>
            <Route path="/user" component={HomeUser} />
            <Route path="/userBooks" component={UserBook} />
            <Route path="/profiles" component={Profile} />
        </div>
    </Router>
);

