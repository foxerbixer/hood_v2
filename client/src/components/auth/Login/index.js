import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../../AC/authActions'
import PropTypes from 'prop-types'
import TextField from '../../common/TextField'

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
  }

  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/settings')
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.auth.isAuthenticated) this.props.history.push('/settings')

    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }



  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)
  }

  render() {

    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to GameNetwork</p>
              
              <form onSubmit={this.handleSubmit}>

                <TextField 
                name="email" 
                type="email"
                placeholder="email"
                value={this.state.value} 
                onChange={this.handleChange}
                error={errors.email}
                />

                <TextField 
                name="password" 
                type="password"
                placeholder="password"
                value={this.state.value} 
                onChange={this.handleChange}
                error={errors.password}
                />

                <input type="submit" className="btn btn-dark btn-block mt-4" />

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
