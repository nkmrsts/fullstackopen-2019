import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const fetchBlogs = () => {
    blogService.getAll().then((initialBlogs) => {
      dispatch(setBlogs(initialBlogs))
    })
  }

  const addNewBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then((data) => {
        dispatch(setBlogs(blogs.concat(data)))
        dispatch(
          setNotification(
            `a new blog${data.title} by ${data.author} added`,
            false
          )
        )
        return data
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, true))
      })
  }

  const likeBlog = (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    blogService
      .update(blog.id, newBlog)
      .then((returnedBlog) => {
        dispatch(
          setBlogs(
            blogs.map((_blog) => (_blog.id !== blog.id ? _blog : returnedBlog))
          )
        )
        dispatch(setNotification(`update blog`, false))
      })
      .catch((error) => {
        dispatch(setNotification(error.response.data.error, true))
      })
  }

  const deleteBlog = (blog) => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          dispatch(setBlogs(blogs.filter((_blog) => _blog.id !== blog.id)))
          dispatch(setNotification(`delete blog`, false))
        })
        .catch((error) => {
          dispatch(setNotification(error.response.data.error, true))
        })
    }
  }

  const sortBlogs = () => {
    dispatch(setBlogs(blogs.slice().sort((a, b) => b.likes - a.likes)))
  }

  return { fetchBlogs, addNewBlog, likeBlog, deleteBlog, sortBlogs}
}
