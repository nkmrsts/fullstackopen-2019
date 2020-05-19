import React from 'react'
import { useField } from '../hooks/useField'
import { useBlogService } from '../hooks/useBlogService'

const Blog = ({ blog, loginUser }) => {
  const comment = useField('text')
  const { commentBlog, likeBlog, deleteBlog } = useBlogService()

  const handleSubmit = (event) => {
    event.preventDefault()

    commentBlog(blog.id, comment.value).then(() => {
      comment.reset()
    })
  }

  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => likeBlog(blog)}>like</button>
      </p>
      <p>added by {blog.author}</p>
      {blog.user && blog.user.name === loginUser.name && (
        <p>
          <button onClick={() => deleteBlog(blog)}>delete</button>
        </p>
      )}

      <h3>commnets</h3>
      <form onSubmit={handleSubmit}>
        <input name="comment" {...comment.excludeReset} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
