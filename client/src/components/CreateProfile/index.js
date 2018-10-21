import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import InputField from '../common/InputField'
import SelectList from '../common/SelectList'
import { createProfile } from '../../AC/profileActions'


class CreateProfile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }

  constructor(){
    super()
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      bio: '',
      location: '',
      status: '',
      skills: '',
      steam: '',
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }

  handleChange = e => {
    this.setState({ [e.target.name ] : e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      bio: this.state.bio,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      steam: this.state.steam,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      linkeedin: this.state.linkedin,
      youtube: this.state.youtube
    }

    this.props.createProfile(profileData, this.props.history) 
  }

  handleOpen = () => {
    this.setState({ displaySocialInputs: !this.state.displaySocialInputs })
  }


  render() {

    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputField
            name="twitter"
            type="text"
            placeholder="Your twitter url"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.handleChange}
            error={errors.twitter}
           />

           <InputField
            name="facebook"
            type="text"
            placeholder="Your facebook url"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.handleChange}
            error={errors.facebook}
           />

           <InputField
            name="linkedin"
            type="text"
            placeholder="Your linkedin url"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.handleChange}
            error={errors.linkedin}
           />

          <InputField
            name="youtube"
            type="text"
            placeholder="Your youtube url"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.handleChange}
            error={errors.youtube}
           />

           <InputField
            name="instagram"
            type="text"
            placeholder="Your instagram url"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.handleChange}
            error={errors.instagram}
           />
        </div>
      )
    }


    // select options for status
    const options = [
      { label: '* select professional status', value: '* select professional status' },
      { label: 'Not gamer', value: 'Not gamer' },
      { label: 'DOTA beginner', value: 'DOTA beginner' },
      { label: 'CS:GO beginner', value: 'CS:GO beginner' },
      { label: 'PUBG beginner', value: 'PUBG beginner' },
      { label: 'DOTA semi-pro', value: 'DOTA semi-pro' },
      { label: 'CS:GO semi-pro', value: 'CS:GO semi-pro' },
      { label: 'PUBG semi-pro', value: 'PUBG semi-pro' },
      { label: 'DOTA PRO', value: 'DOTA PRO' },
      { label: 'CS:GO PRO', value: 'CS:GO PRO' },
      { label: 'PUBG PRO', value: 'PUBG PRO' }
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Fill some information to get started</p>
              <small className="d-block pb-3">* = fields're required</small>
              <form onSubmit={this.handleSubmit}>
                <TextField 
                  name="handle"
                  type="text"
                  placeholder="* Profile handle"
                  info="A unique handler for your profile url"
                  error={errors.handle}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <SelectList 
                  name="status"
                  type="text"
                  placeholder="Status"
                  info="Give us an idea what your status now"
                  error={errors.status}
                  options={options}
                  value={this.state.status}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="company"
                  type="text"
                  placeholder="Team"
                  info="Team where you play now"
                  error={errors.company}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="website"
                  type="text"
                  placeholder="website"
                  info="Your website if you have"
                  error={errors.website}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="location"
                  type="text"
                  placeholder="Location"
                  info="Your current city"
                  error={errors.location}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="skills"
                  type="text"
                  placeholder="* Your skills"
                  info="Write your skills like (eg. aim, micro...)"
                  error={errors.skills}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="steam"
                  type="text"
                  placeholder="Your steam account"
                  info="Your steam url"
                  error={errors.steam}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <TextArea 
                  name="bio"
                  type="text"
                  placeholder="Your biography"
                  info="Tell us about yourself"
                  error={errors.bio}
                  value={this.state.value}
                  onChange={this.handleChange}
                />

                <div className="mb-3">
                  <button type="button" onClick={this.handleOpen} className="btn btn-light">
                   Add social links
                  </button>
                  <span className="text-muted">* Optinal</span>
                </div>
                { socialInputs }
                <input type="submit" className="btn btn-dark btn-block ml-4"/>
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

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
