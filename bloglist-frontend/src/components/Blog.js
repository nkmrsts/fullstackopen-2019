import React from 'react'
import { useField } from '../hooks/useField'
import { useBlogService } from '../hooks/useBlogService'
import { Item, Button, Form, List, Divider } from 'semantic-ui-react'

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
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{blog.title}</Item.Header>
          <Item.Meta>added by {blog.author}</Item.Meta>
          <Item.Description>
            {blog.likes} likes{' '}
            <Button size="mini" compact basic onClick={() => likeBlog(blog)}>
              like
            </Button>
            <p>
              url: <a href={blog.url}>{blog.url}</a>
            </p>
          </Item.Description>
          {blog.user && blog.user.name === loginUser.name && (
            <Item.Extra>
              <button onClick={() => deleteBlog(blog)}>delete</button>
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
              <Form.Button type="submit">add comment</Form.Button>
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
