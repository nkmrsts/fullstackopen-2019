import React from 'react'
import { Link } from 'react-router-dom'
import { useBlogService } from '../hooks/useBlogService'

const Blogs = () => {
  const { state: blogs, sortBlogs } = useBlogService()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <button onClick={sortBlogs}>sort</button>
      <div>
        {blogs.map((blog, index) => (
          <div style={blogStyle} key={index}>
            <Link to={`/blogs/${blog.id}`}>
              <strong>{blog.title}</strong>: {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
