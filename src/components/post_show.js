import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../actions'



class PostShow extends Component {
  componentDidMount() {
    // match.params is provided to us from react-router-dom.
    // It pulls of the params from the url
    const { id } = this.props.match.params
    this.props.fetchPost(id)
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post } = this.props

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className='show-nav'>
          <Link to='/'>Back to Index</Link>
          <button
            className='btn btn-primary'
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
        </div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

//{ posts } this is destructuring posts off of the state object
// own props = this.props
function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow)
