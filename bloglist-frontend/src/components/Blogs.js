import React from 'react'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'
import { useBlogService } from '../hooks/useBlogService'

const Blogs = () => {
  const user = useSelector((state) => state.user)
  const { state: blogs, likeBlog, deleteBlog, sortBlogs } = useBlogService()

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
