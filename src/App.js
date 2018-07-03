import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Search from './views/Search';
import Profile from './views/Profile';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/search/:page' component={Search} />
          <Route path='/profile' component={Profile} />
          <Route />
        </Switch>
      </Router>
    );
  }
}

export default App;
