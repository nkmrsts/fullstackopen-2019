import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const blog = {
    title: 'Test text',
    author: 'test user',
    likes: 4
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Test text')
    expect(component.container).toHaveTextContent('test user')
    expect(component.container).toHaveTextContent(4)
  })

  test('button click twice', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
