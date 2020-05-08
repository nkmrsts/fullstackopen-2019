import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from '../reducers/blogsReducer'
import { useNotification } from '../hooks/useNotification'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { notifyMessage } = useNotification()

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
        notifyMessage(`a new blog${data.title} by ${data.author} added`,
        false)
        return data
      })
      .catch((error) => {
        notifyMessage(error.response.data.error, true)
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
        notifyMessage(`update blog`, false)

      })
      .catch((error) => {
        notifyMessage(error.response.data.error, true)
      })
  }

  const deleteBlog = (blog) => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          dispatch(setBlogs(blogs.filter((_blog) => _blog.id !== blog.id)))
          notifyMessage(`delete blog`, false)
        })
        .catch((error) => {
          notifyMessage(error.response.data.error, true)
        })
    }
  }

  const sortBlogs = () => {
    dispatch(setBlogs(blogs.slice().sort((a, b) => b.likes - a.likes)))
  }

  return { fetchBlogs, addNewBlog, likeBlog, deleteBlog, sortBlogs}
}
