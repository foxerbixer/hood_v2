import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Landing extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {

    let content
    this.props.auth.isAuthenticated === true
      ? content = null
      : content = (
        <div>
          <Link to="/register" className="btn btn-lg btn-dark mr-2">Sign Up</Link>
          <Link to="/login" className="btn btn-lg btn-secondary">Login</Link>
        </div>
      )
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4"> Game Network </h1>
                <p className="lead"> 
                  Find gamers like you. Chat with them and become PRO
                </p> 
                <hr />
                { content }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Landing)

