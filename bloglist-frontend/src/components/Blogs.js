import React from 'react'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'
import { useBlogs } from '../hooks/useBlogs'

const Blogs = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const { likeBlog, deleteBlog, sortBlogs } = useBlogs()

  return (
    <div>
      <button onClick={sortBlogs}>sort</button>
      {blogs.map((blog, index) => (
        <Blog
          blog={blog}
          user={user}
          key={index}
          handleClickLike={likeBlog}
          handleClickDelete={deleteBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
