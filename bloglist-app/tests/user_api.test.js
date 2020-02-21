const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password', saltRounds)

    const user = new User({ username: 'root', name: 'superuser', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password', saltRounds)
    const user = new User({ username: 'root2', name: 'superuser2', passwordHash })
    await user.save()

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(user.username)
  })

  test('username is not unique.', async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('password', saltRounds)
    const user = new User({ username: 'root', name: 'superuser', passwordHash })

    const res = await user.save().catch(error => error.message )
    expect(res).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `root`')
  })

  test('username が3文字以上でない.', async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('1234', saltRounds)
    const user = new User({ username: '12', name: 'superuser', passwordHash })

    const res = await user.save().catch(error => error.message )
    expect(res).toBe('User validation failed: username: Path `username` (`12`) is shorter than the minimum allowed length (3).')
  })
})

afterAll(() => {
  mongoose.connection.close()
})