import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { useNotification } from './useNotification'
import blogService from '../services/blogs'

export const useBlogService = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.blogs)
  const { notifyMessage } = useNotification()

  const fetchBlogs = useCallback(() => {
    blogService.getAll().then((initialBlogs) => {
      dispatch(setBlogs(initialBlogs))
    })
  }, [dispatch])

  const addNewBlog = async (newBlog) => {
    blogService
      .create(newBlog)
      .then((data) => {
        dispatch(setBlogs(state.concat(data)))
        notifyMessage(`a new blog${data.title} by ${data.author} added`, false)
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

  const commentBlog = async (id, comment) => {
    blogService
      .comment(id, comment)
      .then((returnedBlog) => {
        dispatch(
          setBlogs(
            state.map((_blog) =>
              _blog.id !== returnedBlog.id ? _blog : returnedBlog
            )
          )
        )
        notifyMessage(`add comment blog on ${returnedBlog.title}`, false)
      })
      .catch((error) => {
        notifyMessage(error.response.data.error, true)
      })
  }

  const sortBlogs = () => {
    dispatch(setBlogs(state.slice().sort((a, b) => b.likes - a.likes)))
  }

  return {
    state,
    fetchBlogs,
    addNewBlog,
    likeBlog,
    deleteBlog,
    commentBlog,
    sortBlogs,
  }
}
