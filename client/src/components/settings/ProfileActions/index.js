import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions =  () => {
  return (
    <div >
      <Link to="edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-success"></i> Edit Profile
      </Link>
      <Link to="add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-success"></i>Add Experience
      </Link>
      <Link to="add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-success"></i> Add Education
      </Link>
    </div>
  )
}

export default ProfileActions
