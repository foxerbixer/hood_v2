import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import { addEducation } from '../../AC/profileActions'

class AddEducation extends Component {
  static propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
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
    
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addEducation(eduData, this.props.history)
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="com-md-8 m-auto">
              <Link className="btn btn-light" to="/settings">Go Back</Link>
              <h1 className="display-4 text-center">
                Add Education
              </h1>
              <p className="lead text-center">Add any school, univirsity etc...</p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="school"
                  type="text"
                  placeholder="* School"
                  value={this.state.school}
                  onChange={this.handleChange}
                  error={errors.school}
                />
                <TextField
                  name="degree"
                  type="text"
                  placeholder="* Degree or certification"
                  value={this.state.degree}
                  onChange={this.handleChange}
                  error={errors.degree}
                />
                <TextField
                  name="fieldofstudy"
                  type="text"
                  placeholder="Field of study"
                  value={this.state.fieldofstudy}
                  onChange={this.handleChange}
                  error={errors.fieldofstudy}
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
                  placeholder="Programm Description"
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

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))
