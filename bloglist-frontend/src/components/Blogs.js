import React from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const likeBlog = (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    blogService
      .update(blog.id, newBlog)
      .then((returnedBlog) => {
        dispatch(
          setBlogs(
            blogs.map((_blog) => (_blog.id !== blog.id ? _blog : returnedBlog))
          )
        )
        dispatch(setNotification(`update blog`, false))
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, true))
      })
  }

  const deleteBlog = (blog) => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          dispatch(setBlogs(blogs.filter((_blog) => _blog.id !== blog.id)))
          dispatch(setNotification(`delete blog`, false))
        })
        .catch((error) => {
          dispatch(setNotification(error.response.data.error, true))
        })
    }
  }

  const handleSort = () => {
    dispatch(setBlogs(blogs.slice().sort((a, b) => b.likes - a.likes)))
  }

  return (
    <div>
      <button onClick={handleSort}>sort</button>
      {blogs.map((blog, index) => (
        <Blog
          blog={blog}
          user={user}
          key={index}
          handleClickLike={likeBlog}
          handleClickDelete={deleteBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
