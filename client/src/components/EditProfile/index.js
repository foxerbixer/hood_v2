import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from '../common/TextField'
import TextArea from '../common/TextArea'
import InputField from '../common/InputField'
import SelectList from '../common/SelectList'
import { createProfile, getCurrentProfile } from '../../AC/profileActions'
import isEmpty from '../../validation/is-empty'


class CreateProfile extends Component {
  static propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }

  constructor(props){
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      steam: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile()

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.profile.profile) {

      const profile = nextProps.profile.profile

      // skills
      const skillsToString = profile.skills.join(',')

      profile.handle = isEmpty(profile.handle) ? '' : profile.handle
      profile.company = isEmpty(profile.company) ? '' : profile.company
      profile.website = isEmpty(profile.website) ? '' : profile.website
      profile.steam = isEmpty(profile.steam) ? '' : profile.steam
      profile.bio = isEmpty(profile.bio) ? '' : profile.bio
      profile.location = isEmpty(profile.location) ? '' : profile.location
      profile.status = isEmpty(profile.status) ? '' : profile.status

      profile.social = isEmpty(profile.social) ? {} : profile.social
      profile.twitter = isEmpty(profile.social.twitter) ? '' : profile.social.twitter
      profile.facebook = isEmpty(profile.social.facebook) ? '' : profile.social.facebook
      profile.linkedin = isEmpty(profile.social.linkedin) ? '' : profile.social.linkedin
      profile.youtube = isEmpty(profile.social.youtube) ? '' : profile.social.youtube
      profile.instagram = isEmpty(profile.social.instagram) ? '' : profile.social.instagram

      this.setState({
        skills: skillsToString,
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        steam: profile.steam,
        bio: profile.bio,
        status: profile.status,
        location: profile.location,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        youtube: profile.youtube
      })

    }
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
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    }

    this.props.createProfile(profileData, this.props.history) 
  }

  handleOpen = () => {
    this.setState({ displaySocialInputs: !this.state.displaySocialInputs })
  }

  handleChange = e => {
    this.setState({ [e.target.name ] : e.target.value })
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
            <Link className="btn btn-light" to="/settings">Go Back</Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = fields're required</small>
              <form onSubmit={this.handleSubmit}>
                <TextField 
                  name="handle"
                  type="text"
                  placeholder="* Profile handle"
                  info="A unique handler for your profile url"
                  error={errors.handle}
                  value={this.state.handle}
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
                  value={this.state.company}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="website"
                  type="text"
                  placeholder="website"
                  info="Your website if you have"
                  error={errors.website}
                  value={this.state.website}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="location"
                  type="text"
                  placeholder="Location"
                  info="Your current city"
                  error={errors.location}
                  value={this.state.location}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="skills"
                  type="text"
                  placeholder="* Your skills"
                  info="Write your skills like (eg. aim, micro...)"
                  error={errors.skills}
                  value={this.state.skills}
                  onChange={this.handleChange}
                />

                <TextField 
                  name="steam"
                  type="text"
                  placeholder="Your steam account"
                  info="Your steam url"
                  error={errors.steam}
                  value={this.state.steam}
                  onChange={this.handleChange}
                />

                <TextArea 
                  name="bio"
                  type="text"
                  placeholder="Your biography"
                  info="Tell us about yourself"
                  error={errors.bio}
                  value={this.state.bio}
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

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile))
