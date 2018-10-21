import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { deletePost, addLike, removeLike } from '../../../AC/postActions'

class PostItem extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
  }

  handleDelete = postID => () => {
    this.props.deletePost(postID)
  }

  handleAddLike = postID => () => {
    this.props.addLike(postID)
  }

  handleRemoveLike = postID => () => {
    this.props.removeLike(postID)
  }

  findUserLike = likes => {
    const { auth } = this.props

    if (likes.filter(like => like.user === auth.user.id).length > 0) return true
    else return false
  }

  render() {

    const { post, auth, showActions } = this.props

    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
     
             
            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                  alt="User avatar" />
   
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
                {
                  showActions 
                  ? (<span>
                    <button type="button" className="btn btn-light mr-1" onClick={this.handleAddLike(post._id)}>
                  <i className={classnames("fas fa-thumbs-up", {
                    "text-success": this.findUserLike(post.likes)
                  })} />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light mr-1" onClick={this.handleRemoveLike(post._id)}>
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-secondary mr-1">
                  Comments
                </Link>
                {
                    post.user === auth.user.id
                  ? (<button type="button" className="btn btn-danger mr-1" onClick={this.handleDelete(post._id)}>
                      <i className="fas fa-times" />
                    </button>) 
                  : null
                }
              </span>)
                  : null
                }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)
