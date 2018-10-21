import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../../AC/profileActions'

class Education extends Component {
  static propTypes = {
    deleteEducation: PropTypes.func.isRequired
  }

  handleDelete = id => () => {
    this.props.deleteEducation(id)
  }

  render() {
    
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> {' * '}
          { edu.to === null ? ' NOW' : <Moment format="YYYY/MM/DD">{edu.from}</Moment> }  
        </td>
        <td><button className="btn btn-danger" onClick={this.handleDelete(edu._id)}>Delete</button></td>
      </tr>
    ))

    return (
      <div>
        <h2>Education List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>  
          </thead>
          <tbody>
            { education }
          </tbody>
        </table>
      </div>
    )
  }
}


export default connect(null, { deleteEducation })(Education)