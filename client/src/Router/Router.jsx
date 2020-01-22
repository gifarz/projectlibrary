import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profile from './Profile';

class Routing extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/profile" component={Profile}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        )
    }
}

export default Routing;