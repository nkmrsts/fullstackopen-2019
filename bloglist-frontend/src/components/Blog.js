import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useField } from '../hooks/useField'
import { useBlogAction } from '../actions/useBlogAction'
import { useNotificationAction } from '../actions/useNotificationAction'
import { Item, Button, Form, List, Divider } from 'semantic-ui-react'

const Blog = ({ id }) => {
  const { blogs, commentBlog, likeBlog, deleteBlog } = useBlogAction()
  const loginUser = useSelector((state) => state.loginUser)
  const { isShowNotification } = useNotificationAction()

  const blog = blogs.find((blog) => blog.id === id)

  const comment = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    commentBlog(blog.id, comment.value).then(() => {
      comment.reset()
    })
  }

  if (blog === undefined) {
    return <Redirect to="/" />
  }

  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{blog.title}</Item.Header>
          <Item.Meta>added by {blog.author}</Item.Meta>
          <Item.Description>
            {blog.likes} likes{' '}
            <Button
              size="mini"
              compact
              basic
              disabled={isShowNotification}
              onClick={() => likeBlog(blog)}
            >
              like
            </Button>
            <p>
              url: <a href={blog.url}>{blog.url}</a>
            </p>
          </Item.Description>
          {blog.user && blog.user.name === loginUser.name && (
            <Item.Extra>
              <Button
                size="mini"
                compact
                disabled={isShowNotification}
                onClick={() => deleteBlog(blog)}
              >
                delete
              </Button>
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
      <Divider />
      <Item>
        <Item.Content>
          <h3>commnets</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field>
                <input name="comment" {...comment.excludeReset} />
              </Form.Field>
              <Form.Button type="submit" disabled={isShowNotification}>
                add comment
              </Form.Button>
            </Form.Group>
          </Form>
          <List bulleted>
            {blog.comments &&
              blog.comments.map((comment, index) => (
                <List.Item key={index}>{comment}</List.Item>
              ))}
          </List>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default Blog
