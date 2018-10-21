import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileHeader from '../ProfileHeader'
import ProfileAbout from '../ProfileAbout'
import ProfileCreds from '../ProfileCreds'
import ProfileSteam from '../ProfileSteam'
import Spinner from '../../common/SpinnerLoading'
import { getProfileByHandle } from '../../../AC/profileActions'

export class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {

    const { profile, isLoading } = this.props.profile
    let profileContent

    profileContent = (profile === null || isLoading)
    ? <Spinner />
    : ( 
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back to profiles
            </Link>
          </div>
          <div className="col-md-6" />       
        </div>
        <ProfileHeader profile={profile}/>
        <ProfileAbout  profile={profile}/>
        <ProfileCreds education={profile.education} experience={profile.experience}/>
        { 
          profile.steam
          ? <ProfileSteam  username={profile.steam}/> 
          : null
        }

      </div>
    )

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { profileContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
