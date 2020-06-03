import React, { useEffect } from 'react'
import Blogs from '../components/Blogs'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { Divider } from 'semantic-ui-react'
import { useBlogAction } from '../actions/useBlogAction'

const AllView = () => {
  const { fetchBlogs } = useBlogAction()

  useEffect(() => {
    fetchBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
        <Divider />
      </Togglable>
      <Divider />
      <Blogs />
    </div>
  )
}

export default AllView
