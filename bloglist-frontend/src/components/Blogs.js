import React from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'

const Blogs = (props) => {

  const likeBlog = blog => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        props.setBlogs(
          props.blogs.map(_blog => (_blog.id !== blog.id ? _blog : returnedBlog))
        )
        props.setNotification(`update blog`, false)
      })
      .catch(error => {
        props.setNotification(error.response.data.error, true)
      })
  }

  const deleteBlog = blog => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          props.setBlogs(props.blogs.filter(_blog => _blog.id !== blog.id))
          props.setNotification(`delete blog`, false)
        })
        .catch(error => {
          props.setNotification(error.response.data.error, true)
        })
    }
  }

  return <>
    {props.blogs.map((blog, index) => (
      <Blog
        blog={blog}
        user={props.user}
        key={index}
        handleClickLike={likeBlog}
        handleClickDelete={deleteBlog}
      />
    ))}
  </>
}


const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs
  };
};
const mapDispatchToProps = {
  setBlogs,
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)