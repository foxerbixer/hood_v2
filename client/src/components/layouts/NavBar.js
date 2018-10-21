import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../AC/authActions'
import { clearProfile } from '../../AC/profileActions'
import logo from '../../img/logo.png'


class NavBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    clearProfile: PropTypes.func.isRequired
  }

  logoutHandler = e => {
    e.preventDefault()
    this.props.clearProfile()
    this.props.logOut()
  }

  render() {

    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <Link className="nav-link" to="/gamers-room">
            Gamers room
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts">Posts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">Members</Link>
        </li>
        <li className="nav-item mr-5">
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={this.logoutHandler}>
            <img src={user.avatar} alt={user.name} style={{width: '25px', marginRight: '5px', borderRadius: '50%'}}/>
            logout
          </Link>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/login">login</Link>
        </li>
      </ul>
    )
    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark pb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
           <img src={logo} style={{width: '50px', height: '50px'}} alt="logo"/>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            {/* <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Gamers</Link>
              </li>
            </ul> */}
            { isAuthenticated ? authLinks : guestLinks }
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logOut, clearProfile })(NavBar)
