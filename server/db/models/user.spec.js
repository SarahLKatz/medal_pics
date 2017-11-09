/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('CreatesUser', () => {
    describe('UserNameSaved', () => {
      let liana

      beforeEach(() => {
        return User.create({
          name: 'Liana',
          email: 'liana@alwaysnice.com',
          password: 'baloons'
        })
          .then(user => {
            liana = user
          })
      })

      it('creates a user in the database with the correct email', () => {
        expect(liana.email).to.be.equal('liana@alwaysnice.com')
      })

      it('saves the users name in the database', () => {
        expect(liana.name).to.be.equal('Liana')
      })
    }) // end describe('UserNameSaved')
  }) // end describe('CreatesUser')

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          name: 'Cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
