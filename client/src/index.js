import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from './Router/NavBar';
import Register from './FinalProject/Register';
import Login from './FinalProject/Login';
import LoginSuccess from './FinalProject/LoginSuccess';
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import Book from "./FinalProject/ListBook/App";
import CardBook from './FinalProject/CardBook/CardBook';
import UpdateBook from './FinalProject/ListBook/UpdateBook';
import CardDetails from "./FinalProject/CardBook/CardDetails";
import Users from './FinalProject/ManageUser';
import EditProfile from './FinalProject/EditProfile';
import LandingPage from './FinalProject/LandingPage';

const routing = (
    <Router>
        <NavBar/>  
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={LoginSuccess} />
        <Route path="/book" component={CardBook} />
        <Route path="/addbook" component={Book} />
        <Route path="/bookupdate/:id" component={UpdateBook} />
        <Route path="/bookdetails/:id" component={CardDetails} />
        <Route path="/users" component={Users} />
        <Route path="/editprofile/:id" component={EditProfile} />
    </Router>
)

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
