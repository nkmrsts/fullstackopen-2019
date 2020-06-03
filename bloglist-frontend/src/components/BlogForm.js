import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useField } from '../hooks/useField'
import { useBlogAction } from '../actions/useBlogAction'
import { useNotificationAction } from '../actions/useNotificationAction'

const BlogForm = () => {
  const { addNewBlog } = useBlogAction()
  const { isShowNotification } = useNotificationAction()

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
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>title</label>
        <input name="title" {...title.excludeReset} />
      </Form.Field>
      <Form.Field>
        <label>author</label>
        <input name="author" {...author.excludeReset} />
      </Form.Field>
      <Form.Field>
        <label>url</label>
        <input {...url.excludeReset} name="url" />
      </Form.Field>
      <Button type="submit" primary disabled={isShowNotification}>
        create
      </Button>
    </Form>
  )
}

export default BlogForm
