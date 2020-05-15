import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { useNotification } from './useNotification'
import blogService from '../services/blogs'

export const useBlogService = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.blogs)
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
        dispatch(setBlogs(state.concat(data)))
        notifyMessage(`a new blog${data.title} by ${data.author} added`, false)
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
            state.map((_blog) => (_blog.id !== blog.id ? _blog : returnedBlog))
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
          dispatch(setBlogs(state.filter((_blog) => _blog.id !== blog.id)))
          notifyMessage(`delete blog`, false)
        })
        .catch((error) => {
          notifyMessage(error.response.data.error, true)
        })
    }
  }

  const sortBlogs = () => {
    dispatch(setBlogs(state.slice().sort((a, b) => b.likes - a.likes)))
  }

  return { state, fetchBlogs, addNewBlog, likeBlog, deleteBlog, sortBlogs }
}
