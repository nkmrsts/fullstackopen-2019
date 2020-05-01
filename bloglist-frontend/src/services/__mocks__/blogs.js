const blogs = [
  {
    title: 'Test',
    author: 'Test Tarou',
    url: '',
    likes: 1,
    user: 'root',
  },
  {
    title: 'Test2',
    author: 'Test Tarou',
    url: '',
    likes: 0,
    user: 'root',
  },
  {
    title: 'Test3',
    author: 'Test Tarou',
    url: '',
    likes: 9,
    user: 'root',
  },
]

let token = null

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
