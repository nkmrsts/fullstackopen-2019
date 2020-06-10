const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuidv1 } = require('uuid');
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({
          author: {$in: author.id},
          genres: {$in: args.genre}
        }).populate('author')
      } else if(args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: {$in: author.id}}).populate('author')
      } else if(args.genre) {
        return Book.find({ genres: {$in: args.genre}}).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.find({ author: {$in: [root.id]}}).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.author })
      try {
        if(!foundAuthor) {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          const book = new Book({ ...args, author: newAuthor.id })
          await book.save()
          return book
        } else {
          const book = new Book({ ...args, author: foundAuthor.id })
          await book.save()
          return book
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
         return await Author.findOneAndUpdate({ name: args.name}, { born: args.setBornTo  })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
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