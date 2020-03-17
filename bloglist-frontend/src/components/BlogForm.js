import React from 'react'

const BlogForm = ({ title, author, url, addNewBlog }) => (
  <form onSubmit={addNewBlog}>
    <div>
      title
      <input name="title" {...title} />
    </div>
    <div>
      author
      <input name="author" {...author} />
    </div>
    <div>
      url
      <input {...url} name="url" />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm
