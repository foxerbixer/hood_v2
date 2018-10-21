import React, { Component } from 'react'
import PostItem from '../PostItem'
import PropTypes from 'prop-types'

class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {

    const { posts } = this.props

    return posts.map(post => <PostItem key={post._id} post={post} />)
  }
}
 
export default PostsList
