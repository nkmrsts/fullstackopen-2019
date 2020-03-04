import React, { useState } from 'react'
const Blog = ({ blog, user, handleClickLike, handleClickDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = () => (
    <ul>
      <li onClick={toggleVisible}>
        <strong>{blog.title}</strong>
      </li>
      <li>{blog.url}</li>
      <li>
        {blog.likes} likes
        <button onClick={() => handleClickLike(blog)}>like</button>
      </li>
      <li>added by {blog.author}</li>
      {blog.user && blog.user.name === user.name && (
        <li>
          <button onClick={() => handleClickDelete(blog)}>delete</button>
        </li>
      )}
    </ul>
  )

  const hidehenVisible = () => (
    <div onClick={toggleVisible}>
      <strong>{blog.title}</strong>: {blog.author}
    </div>
  )

  return (
    <div style={blogStyle}>
      {visible ? showWhenVisible() : hidehenVisible()}
    </div>
  )
}

export default Blog
