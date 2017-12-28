const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/coords/:location', (req, res, next) => {
  console.log('location', req.params.location)
  let responseLocation, coords;
  axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${req.params.location}`)
  .then(res => {
    responseLocation = res.data[0];
    coords = [responseLocation.lat, responseLocation.lon];
  })
  .then(() => {
    res.json(coords)
  })
})