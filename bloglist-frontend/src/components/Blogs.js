import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Table } from 'semantic-ui-react'
import { useBlogService } from '../hooks/useBlogService'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const { sortBlogs } = useBlogService()

  return (
    <div>
      <Button onClick={sortBlogs}>sort</Button>
      <Table striped celled fixed>
        <Table.Body>
          {blogs.map((blog) => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>
                  <strong>{blog.title}</strong>
                </Link>
              </Table.Cell>
              <Table.Cell>{blog.author}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Blogs
