/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Race = db.model('race')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const cody = {
      name: 'Cody',
      email: 'cody@puppybook.com'
    }

    beforeEach(() => {
      return User.create(cody)
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal('cody@puppybook.com')
        })
    })
  }) // end describe('/api/users')

  describe('/api/users/:userId/race', () => {
    const cody = {
      name: 'Cody',
      email: 'cody@puppybook.com'
    }
    const race = {
      name: 'TCS New York City Marathon',
      date: '11/5/2017',
      start: '10:12',
      location: 'Central Park',
      completionTime: '04:21:34',
      userId: 1
    }

    beforeEach(() => {
      return User.create(cody)
      .then(() => {
        return Race.create(race)
      })
    })

    it('GET /api/:userId/races', () => {
      return request(app)
        .get('/api/users/1/races')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.race.userId).to.be.equal(1)
          expect(res.body.completed).to.be.equal(true)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
