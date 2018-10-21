import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../../validation/is-empty'

export class ProfileItem extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  render() {

    const { profile } = this.props

    return (
      <div className="card card-body bg-light mb-3">
      
        <div className="row">
          <div className="col-2">
            <img src={ profile.user.avatar } className="rounded-circle" alt="Avatar"/>
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{ profile.user.name }</h3>
            <p>{ profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>) }</p>
            <p>{ isEmpty(profile.location) ? null : (<span>{profile.location}</span>) }</p>
            <Link className="btn btn-dark" to={`/profile/${profile.handle}`}>
              View profile
            </Link>
          </div>

          <div className="col-md-4 d-none d-md-block">
            <h2>Skills</h2>
            <ul className="list-group">
              {
                profile.skills.map((skill, index) => (
                  <li className="list-group-item" key={index}>
                    <i className="fa fa-check pr-1" />
                    {skill}
                  </li>
                ))
              }
            </ul>
          </div> 

        </div>
      </div>
    )
  }
}

export default ProfileItem
