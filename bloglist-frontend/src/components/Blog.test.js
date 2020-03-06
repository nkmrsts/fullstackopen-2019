import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Test text',
    author: 'test user'
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} onClick={mockHandler} />)
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Test text')
    expect(component.container).toHaveTextContent('test user')
  })

  test('button click', () => {
    const element = component.container.querySelector('.blog-showWhenVisible')
    const toggle = component.container.querySelector('.blog-hideWhenVisible')

    expect(element === 'undefined')
    fireEvent.click(toggle)
    expect(element).toBeDefined()
  })
})
