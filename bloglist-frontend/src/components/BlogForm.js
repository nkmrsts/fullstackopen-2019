import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    blogService
      .create(newBlog)
      .then((data) => {
        dispatch(setBlogs(blogs.concat(data)))
        title.reset()
        author.reset()
        url.reset()
        dispatch(
          setNotification(
            `a new blog${data.title} by ${data.author} added`,
            false
          )
        )
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, true))
      })
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title
        <input name="title" {...title.excludeReset} />
      </div>
      <div>
        author
        <input name="author" {...author.excludeReset} />
      </div>
      <div>
        url
        <input {...url.excludeReset} name="url" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
