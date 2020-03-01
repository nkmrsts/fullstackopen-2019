import React from 'react'

const BlogForm = ({ newBlog, setNewBlog, createNewBlog }) => (
  <form onSubmit={createNewBlog}>
    <div>
      title
      <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={({ target }) =>
          setNewBlog({
            ...newBlog,
            title: target.value
          })
        }
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={({ target }) =>
          setNewBlog({
            ...newBlog,
            author: target.value
          })
        }
      />
    </div>
    <div>
      url
      <input
        type="url"
        value={newBlog.url}
        name="url"
        onChange={({ target }) =>
          setNewBlog({
            ...newBlog,
            url: target.value
          })
        }
      />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm
