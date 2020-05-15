import React from 'react'
import { useField } from '../hooks/useField'
import { useBlogService } from '../hooks/useBlogService'

const BlogForm = () => {
  const { addNewBlog } = useBlogService()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    addNewBlog(newBlog).then(() => {
      title.reset()
      author.reset()
      url.reset()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
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
