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

router.get('/:id/last', (req,res,next) => {
  Race.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then(races => {
      if (races.length){
        let completedRaces = races.filter(race => race.isCompleted()).sort((a,b) => a.date > b.date);
        const lastRace = completedRaces[completedRaces.length-1];
        res.json({
          race: lastRace,
          completed: lastRace.isCompleted()
        })
      } else {
        res.json({})
      }
    })
})

router.post('/:id/races', (req, res, next) => {
  Race.create(req.body)
  .then(race => res.json(race))
})
