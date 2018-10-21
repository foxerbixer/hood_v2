import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from '../layouts/NavBar'
import Landing from '../layouts/Landing'
import Footer from '../layouts/Footer'
import Settings from '../settings/Settings'

import PrivateRoute from '../common/PrivateRoute'

import Register from '../auth/Register'
import Login from '../auth/Login'

import CreateProfile from '../CreateProfile'
import EditProfile from '../EditProfile'
import AddExperience from '../AddExperience'
import AddEducation from '../AddEducation'
import Posts from '../posts/Posts'
import Post from '../post/Post'

import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import GamersRoom from '../GamersRoom'


import './style.css';

class App extends Component {
  render() { 
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Route exact path="/" component={ Landing } />

          <div className="container">
            <Route exact path="/register" component={ Register }  />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/profiles" component={ Profiles } />
            <Route exact path="/profile/:handle" component={ Profile } />

            <Switch>
              <PrivateRoute exact path="/settings" component={ Settings } />
              <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
              <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
              <PrivateRoute exact path="/add-experience" component={ AddExperience }/>
              <PrivateRoute exact path="/add-education" component={ AddEducation }/>
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute exact path="/gamers-room" component={GamersRoom} />
            </Switch>

          </div>

          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;
