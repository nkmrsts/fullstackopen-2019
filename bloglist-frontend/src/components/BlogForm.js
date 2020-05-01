import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setBlogs } from '../reducers/blogsReducer'

const BlogForm = (props) => {
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
        props.setBlogs(props.blogs.concat(data))
        title.reset()
        author.reset()
        url.reset()
        setNotification(
          `a new blog${data.title} by ${data.author} added`,
          false
        )
      })
      .catch((error) => {
        setNotification(error.response.data.error, true)
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}
const mapDispatchToProps = {
  setNotification,
  setBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
