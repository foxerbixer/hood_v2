import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../../AC/postActions'

class CommentItem extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired
  }

  handleDelete = (postID, commentID) => () => {
    this.props.deleteComment(postID, commentID)
  }

  render() {

    const { comment, postID, auth } = this.props

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 ">
            <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="Avatar" />
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10 d-flex">
            <p className="lead mr-auto">{comment.text}</p>

            {
                comment.user === auth.user.id
              ? (<button
                  type="button"
                  className="btn btn-danger"
                  style={{height: 50, alignSelf: 'center' }}
                  onClick={this.handleDelete(postID, comment._id)}
                >
                  <i className="fas fa-times" />
                </button>) 
              : null
            }

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})



export default connect(mapStateToProps, { deleteComment })(CommentItem)
