import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../../AC/authActions'
import TextField from '../../common/TextField'

class Register extends Component {

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  } 

  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      avatar: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/settings')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {

    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your GameNetwork account </p>
              <form onSubmit={this.handleSubmit}>

                <TextField 
                  name="name" 
                  type="text"
                  placeholder="name"
                  value={this.state.value} 
                  onChange={this.handleChange}
                  error={errors.name}
                />

                <TextField 
                  name="email" 
                  type="email"
                  placeholder="email"
                  info="This site uses gravatar"
                  value={this.state.value} 
                  onChange={this.handleChange}
                  error={errors.email}
                />

                <TextField 
                  name="avatar" 
                  type="text"
                  placeholder="avatar"
                  value={this.state.value} 
                  onChange={this.handleChange}
                  error={errors.avatar}
                />

                <TextField 
                  name="password" 
                  type="password"
                  placeholder="password"
                  value={this.state.value} 
                  onChange={this.handleChange}
                  error={errors.password}
                />

                <TextField 
                  name="password2" 
                  type="password"
                  placeholder="Confirm password"
                  value={this.state.value} 
                  onChange={this.handleChange}
                  error={errors.password2}
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
