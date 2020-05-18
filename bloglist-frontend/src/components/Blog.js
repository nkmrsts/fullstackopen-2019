import React from 'react'
const Blog = ({ blog, user, handleClickLike, handleClickDelete }) => {
  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => handleClickLike(blog)}>like</button>
      </p>
      <p>added by {blog.author}</p>
      {blog.user && blog.user.name === user.name && (
        <p>
          <button onClick={() => handleClickDelete(blog)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Blog
