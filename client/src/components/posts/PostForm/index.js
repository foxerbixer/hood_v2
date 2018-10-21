import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextArea from '../../common/TextArea'
import { addPost } from '../../../AC/postActions'

class PostForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state = {
      text: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) this.setState({ errors: nextProps.errors})
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { user } = this.props.auth

    const postData = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text,
    }

    this.props.addPost(postData)
    this.setState({ text: ''})
  }

  render() {

    const { errors } = this.state

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-secondary text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextArea
                  placeholder="Create a post"
                  type="text"
                  name="text"
                  error={errors.text}
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})



export default connect(mapStateToProps, { addPost })(PostForm)
