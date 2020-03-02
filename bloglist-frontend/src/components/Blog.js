import React, { useState } from 'react'
const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisible}>
        {visible ? (
          <div>
            <div>
              <strong>{blog.title}</strong>
            </div>
            <div>{blog.url}</div>
            <div>
              {blog.likes} likes<button>like</button>
            </div>
            <div>added by {blog.author}</div>
          </div>
        ) : (
          <div>
            <strong>{blog.title}</strong>: {blog.author}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
