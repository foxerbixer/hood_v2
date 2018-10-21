import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../../AC/profileActions'

class Experience extends Component {
  static propTypes = {
    deleteExperience: PropTypes.func.isRequired
  }

  handleDelete = id => () => {
    this.props.deleteExperience(id)
  }

  render() {
    
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> {' * '}
          { exp.to === null ? ' NOW' : <Moment format="YYYY/MM/DD">{exp.from}</Moment> }  
        </td>
        <td><button className="btn btn-danger" onClick={this.handleDelete(exp._id)}>Delete</button></td>
      </tr>
    ))

    return (
      <div>
        <h2>Experiance List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>  
          </thead>
          <tbody>
            { experience }
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, { deleteExperience })(Experience)