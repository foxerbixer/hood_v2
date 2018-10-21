import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../../common/SpinnerLoading'
import { getPost } from '../../../AC/postActions'
import PostItem from '../../posts/PostItem'
import CommentForm from '../CommentForm'
import CommentList from '../CommentList'

class Post extends Component {
  static propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }



  render() {

    const { post, isLoading } = this.props.post

    let postContent

    (post === null || isLoading || Object.keys(post).length === 0) 
    ? postContent = <Spinner />
    : postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postID={post._id}/>
        <CommentList postID={post._id} comments={post.comments} />
      </div>
    )

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light mb-3">
                Go to posts
              </Link>
              { postContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})


export default connect(mapStateToProps, { getPost })(Post)
