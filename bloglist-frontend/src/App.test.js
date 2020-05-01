import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    // expectations here
    expect(component.container).toHaveTextContent('Log in to application')
    expect(component.container).not.toHaveTextContent('blogs')
  })

  test('when user login, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('blogs'))
    // expectations here
    const element = component.container.querySelectorAll('.blog-info')

    expect(element.length).toBe(3)
  })
})
