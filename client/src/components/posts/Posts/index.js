import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostForm from '../PostForm'
import Spinner from '../../common/SpinnerLoading'
import { getPosts } from '../../../AC/postActions'
import PostsList from '../PostsList'

class Posts extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getPosts()
  }

  render() {

    const { posts, isLoading } = this.props.post

    let postContent

    (posts === null || isLoading)
    ? postContent = <Spinner />
    : postContent = <PostsList posts={posts} />

    return (
      <div className="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
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



export default connect(mapStateToProps, { getPosts })(Posts)
