import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container, Divider } from 'semantic-ui-react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Navigation from './components/Navigation'
import { useBlogAction } from './actions/useBlogAction'
import { useLoginAction } from './actions/useLoginAction'

function App() {
  const { blogs, fetchBlogs } = useBlogAction()
  const { state: loginUser, logout, loggedByLocalStorage } = useLoginAction()

  useEffect(() => {
    fetchBlogs()
    loggedByLocalStorage()
  }, [fetchBlogs, loggedByLocalStorage])

  const blogById = (id) => blogs.find((blog) => blog.id === id)

  if (loginUser === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  const AllView = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
        <Divider />
      </Togglable>
      <Divider />
      <Blogs />
    </div>
  )

  return (
    <Router>
      <Container>
        <Navigation loginUser={loginUser} logout={logout} />
        <h2>blog app</h2>

        <Notification />

        <Route exact path="/" render={() => <AllView />} />

        <Route exact path="/users" render={() => <Users />} />

        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User id={match.params.id} />}
        />

        <Route
          exact
          path="/blogs/:id"
          render={({ match }) =>
            blogById(match.params.id) ? (
              <Blog blog={blogById(match.params.id)} loginUser={loginUser} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Container>
    </Router>
  )
}

export default App
