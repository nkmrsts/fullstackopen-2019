import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNotificationAction } from './useNotificationAction'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogsReducer'
import { concatBlog } from '../reducers/blogsReducer'
import { updateBlog } from '../reducers/blogsReducer'
import { deleteBlog } from '../reducers/blogsReducer'
import { sortBlogs } from '../reducers/blogsReducer'

export const useBlogAction = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { notifyMessage } = useNotificationAction()

  const fetchBlogs = useCallback(() => {
    blogService.getAll().then((initialBlogs) => {
      dispatch(setBlogs(initialBlogs))
    })
  }, [dispatch])

  const addNewBlog = async (newBlog) => {
    blogService
      .create(newBlog)
      .then((blog) => {
        dispatch(concatBlog(blog))
        notifyMessage(`a new blog${blog.title} by ${blog.author} added`, false)
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
          updateBlog({
            id: blog.id,
            newBlog: returnedBlog,
          })
        )
        notifyMessage(`update blog`, false)
      })
      .catch((error) => {
        notifyMessage(error.response.data.error, true)
      })
  }

  const _deleteBlog = (blog) => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          dispatch(
            deleteBlog({
              id: blog.id,
            })
          )
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
          updateBlog({
            id: id,
            newBlog: returnedBlog,
          })
        )
        notifyMessage(`add comment blog on ${returnedBlog.title}`, false)
      })
      .catch((error) => {
        notifyMessage(error.response.data.error, true)
      })
  }

  const _sortBlogs = () => {
    dispatch(sortBlogs())
  }

  return {
    blogs,
    fetchBlogs,
    addNewBlog,
    likeBlog,
    deleteBlog: _deleteBlog,
    commentBlog,
    sortBlogs: _sortBlogs,
  }
}
