import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function App(){
    return(
        <div className="container m-5">
            <Router>
                <Link to="/" style={{marginRight: "5px"}}>Home</Link>
                <Link to="/about" style={{marginRight: "5px"}}>About</Link>
                <Link to="/profile" style={{marginRight: "5px"}}>Profile</Link>
            </Router>
        </div>
    )
}