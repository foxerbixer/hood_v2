import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import isEmpty from '../../../validation/is-empty'

class ProflleCreds extends Component {
  static propTypes = {
    education: PropTypes.array.isRequired,
    experience: PropTypes.array.isRequired
  }
  render() {

    const { education, experience } = this.props

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h2>{exp.company}</h2>
        <p>
          <Moment format="YYYY/MM/DD ">{exp.from}</Moment> *
          {
            isEmpty(exp.to) ? ' Now' : (<Moment format=" YYYY/MM/DD">{ exp.to}</Moment>)
          }
        </p>
        <p><strong> Position: </strong>{exp.title}</p>
        <p>
          {
            isEmpty(exp.location) ? null : (<span><strong>Location: </strong>{exp.location}</span>)
          }
        </p>
        <p>
          {
            isEmpty(exp.description) ? null : (<span><strong>Description:</strong>{exp.description}</span>)
          }
        </p>
      </li>
    ))

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h2>{edu.school}</h2>
        <p>
          <Moment format=" YYYY/MM/DD ">{edu.from}</Moment> *
          {
            isEmpty(edu.to) ? ' Now' : (<Moment format=" YYYY/MM/DD ">{edu.to}</Moment>)
          }
        </p>
        <p><strong>Degree:</strong>{edu.degree}</p>
        <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>
        <p>
          {
            isEmpty(edu.description) ? null : (<span><strong>Description:</strong>{edu.description}</span>)
          }
        </p>
      </li>
    ))

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-success">Experience</h3>
          {
            expItems.length > 0
            ? (<ul className="list-group">{expItems}</ul>)
            : (<p className="text-center">No experience</p>)
          }
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-success">Education</h3>
          {
            eduItems.length > 0
            ? (<ul className="list-group">{eduItems}</ul>)
            : (<p className="text-center">No education</p>)
          }
        </div>
      </div>
    )
  }
}

export default ProflleCreds
