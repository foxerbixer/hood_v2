import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import { addExperience } from '../../AC/profileActions'

class AddExperience extends Component {
  static propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addExperience(expData, this.props.history)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheck = () => {
    this.setState({ 
      disabled: !this.state.disabled,
      current: !this.state.current 
    })
  }

  render() {

    const { errors } = this.state

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="com-md-8 m-auto">
              <Link className="btn btn-light" to="/settings">Go Back</Link>
              <h1 className="display-4 text-center">
                Add Experience
              </h1>
              <p className="lead text-center">Add your position you have had in the past or current</p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="company"
                  type="text"
                  placeholder="* Company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                />
                <TextField
                  name="title"
                  type="text"
                  placeholder="* Job title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  error={errors.title}
                />
                <TextField
                  name="location"
                  type="text"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextField
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.handleChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextField
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.handleChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox" 
                    className="form-check-input"
                    id="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleCheck}
                  />
                  <label className="form-check-label" htmlFor="current">Current Job</label>
                </div>
                <TextArea
                  placeholder="Job Description"
                  name="description"
                  info="Tell us about your position"
                  error={errors.description}
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <input className="btn btn-dark btn-block mt-4" type="submit"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))
