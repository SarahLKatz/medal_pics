const router = require('express').Router()
const {User, Race} = require('../db/models')
const moment = require('moment')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/races', (req,res,next) => {
  Race.findAll({
    where: {
      userId: req.params.id
    }
  })
  .then(races => {
    const lastRace = races[races.length-1];
    res.json({
      race: lastRace,
      completed: lastRace.isCompleted()
    })
  })
})

router.post('/:id/races', (req, res, next) => {
  const userId = req.params.id;
  Race.create(req.body)
  .then(newRace => {
    return newRace.setUser(userId)
  })
  .then(race => res.json(race))
})
