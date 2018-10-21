import React, { Component } from 'react'
import Spinner from '../../common/SpinnerLoading'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteProfile } from '../../../AC/profileActions'
import { Link } from 'react-router-dom'
import ProfileActions from '../ProfileActions'
import Experience from '../Experience'
import Education from '../Education'

class Settings extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  }

  componentDidMount(){
    this.props.getCurrentProfile()
  }

  handleDelete = e => {
    e.preventDefault()
    this.props.deleteProfile()
  }

  render() {

    const { user } = this.props.auth
    const { profile, isLoading } = this.props.profile

    let settingsContent


    if (profile === null || isLoading) settingsContent = <Spinner /> 
    else {
      if (Object.keys(profile).length > 0) {
        settingsContent = (
          <div>
            <p className="lead text-muted">
               Welcome, <Link to={`/profile/${profile.handle}`}> { user.name }!</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience}/>
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }}/>
            <button className="btn btn-danger" onClick={this.handleDelete}> Delete my accaunt</button>
          </div> 
        )

      } 
      else {
        settingsContent = (
          <div style={{ marginBottom: '60px' }}>
            <p className="lead text-muted">Welcome, { user.name }!</p>
            <p className="lead text-muted">You've not setup profile. Please, add something</p>
            <Link to="/create-profile" className="btn btn-dark btn-lg">Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="settings">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4">Settings</div>
              { settingsContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})


export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(Settings)
