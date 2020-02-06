const _ = require("lodash");

const dummy = blogs => {
  // tests
  return 1
}

const totalLikes = blogs => {
  // tests
  const reducer = (total, item) => {
    return total + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const compareFunction = (a, b) => {
    if (a.likes > b.likes) {
      return 1
    } else {
      return -1
    }
  }

  return blogs
    .map(item => {
      return {
        title: item.title,
        author: item.author,
        likes: item.likes
      }
    })
    .sort(compareFunction)[blogs.length - 1]
}

const mostBlogs = blogs => {
  // tests
  return _.maxBy(pickObject(blogs, 'blogs'), "blogs")
}

const mostLikes = blogs => {
  // tests
  return _.maxBy(pickObject(blogs,'likes'), "likes")
}

const pickObject = (blogs, props) =>{
  return blogs.reduce((memo, item) => {
    const findIndex = memo.findIndex(elm => {
      return item.author === elm.author
    })
    const addNum = props === 'blogs' ? 1 : item[props]

    if (findIndex > -1) {
      memo[findIndex][props] += addNum
    } else {
      memo.push({
        author: item.author,
        [props]: addNum
      })
    }
    return memo
  }, [])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}