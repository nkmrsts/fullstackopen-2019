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
  const result = blogs.reduce((memo, item) => {
    const findIndex = memo.findIndex(elm => {
      return item.author === elm.author;
    })
    if (findIndex > -1) {
      memo[findIndex].blogs += 1;
    } else {
      memo.push({
        author: item.author,
        blogs: 1
      })
    }
    return memo
  }, [])
  return _.maxBy(result, "blogs")
}

const mostLikes = blogs => {
  // tests
  const result = blogs.reduce((memo, item) => {
    const findIndex = memo.findIndex(elm => {
      return item.author === elm.author
    })
    if (findIndex > -1) {
      memo[findIndex].likes += item.likes
    } else {
      memo.push({
        author: item.author,
        likes: item.likes
      })
    }
    return memo
  }, [])
  return _.maxBy(result, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}