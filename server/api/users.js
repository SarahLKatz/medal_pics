const router = require('express').Router()
const {User, Race} = require('../db/models')
const moment = require('moment')
const axios = require('axios')
const stravaQueryHeaders = process.env.STRAVA_QUERY_HEADERS;
module.exports = router
const now = moment();

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
        let pastRaces = races.filter(race => moment(race.date).isAfter(now.subtract(7,'d')));
        const lastRace = pastRaces[pastRaces.length-1];
        res.json({
          race: lastRace,
          completed: lastRace.isCompleted()
        })
      } else {
        res.json({})
      }
    })
})

router.get('/:id/races', (req,res,next) => {
  Race.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then(races => {
      if (races.length){
        let completedRaces = [];
        let upcomingRaces = [];
        for (let i = 0; i < races.length; i++) {
          if (races[i].isCompleted()) {
            completedRaces.push(races[i])
          } else {
            upcomingRaces.push(races[i])
          }
        }
        res.json({
          completed: completedRaces.sort((a,b) => moment(a.date).isAfter(moment(b.date))),
          upcoming: upcomingRaces.sort((a,b) => moment(a.date).isAfter(moment(b.date)))
        })
      } else {
        res.json({})
      }
    })
})

router.get('/:id/strava', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['stravaId']
  })
  .then(stravaId => {
    if (!stravaId) return;
    axios.get('https://www.strava.com/api/v3/athlete/activities', { headers: {'Authorization': stravaQueryHeaders} })
    .then(res => res.data)
    .then(data => {
      let runIdx = 0;
      while (!data[runIdx].end_latlng) {
        runIdx++
      }
      res.json(data[runIdx])
    })
  })
})

router.get('/:id/strava/:date', (req, res, next) => {
  let start, end;
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['stravaId']
  })
  .then(stravaId => {
    if (!stravaId) return;
    start = moment(req.params.date).subtract(1, 'days').unix();
    end = moment(req.params.date).add(1, 'days').unix();
    axios.get(`https://www.strava.com/api/v3/athlete/activities?after=${start}&before=${end}`, { headers: {'Authorization': stravaQueryHeaders} })
    .then(res => res.data)
    .then(run => {
      res.json(run)
    })
  })
})

router.post('/:id/races', (req, res, next) => {
  Race.findOrCreate({where: {userId: req.body.userId, name: req.body.name, date: req.body.date}, defaults: req.body})
  .spread((race, created) => res.json(race))
})

router.delete('/:id/race/:raceId', (req,res,next) => {
  Race.findOne({
    where: {
      userId: req.params.id,
      id: req.params.raceId
    }
  })
  .then(race => {
    race.destroy()
    res.json({})
  })
})
