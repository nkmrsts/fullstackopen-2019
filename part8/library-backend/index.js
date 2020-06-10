const { ApolloServer, gql } = require('apollo-server')
const { v1: uuidv1 } = require('uuid');
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }

      let filteredBooks = [...books]
      if(args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author)
      }
      if(args.genre) {
        filteredBooks = filteredBooks.filter(book => {
          return book.genres.includes(args.genre)
        })
      }
      return filteredBooks
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuidv1() }
      books = books.concat(book)

      const foundAuthor = authors.findIndex(author => author.name === args.author)
      if(foundAuthor === -1) {
        const newAuthor = {
          name: args.author,
          id: uuidv1()
        }
        authors = authors.concat(newAuthor)
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if(!author) return null

      const updateAuthor = {
        ...author,
        born: args.setBornTo
      }
      authors = authors.map(author => author.name === args.name ? updateAuthor : author)
      return updateAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})