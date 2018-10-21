import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../../validation/is-empty'

class ProfileAbout extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  render() {

    const { profile } = this.props

    // get first name
    const firstName = profile.user.name.trim().split(' ')[0]

    const skills = profile.skills.map((item, index) => (
      <div className="p-3" key={index}>
        <i className="fa fa-check" /> {item}
      </div>
      ))

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-success">{ firstName }'s bio</h3>
            <p className="lead text-center">
              { isEmpty(profile.bio) ? (<span>{firstName} hasn't told about himself yet</span>) : profile.bio }
            </p>
            <hr />
            <h3 className="text-center text-success">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                { skills }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout
