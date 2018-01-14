const router = require('express').Router();
const axios = require('axios');
const flickrAPI = process.env.FLICKR_API_KEY;
module.exports = router;

router.get('/coords/:location', (req, res, next) => {
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

router.get('/photos/:coords', (req, res, next) => {
  let coords = req.params.coords.split(",");
  let photos;
  let lat = coords[0];
  let lon = coords[1];
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAPI}&tags=background%2Clandmark&lat=${lat}&lon=${lon}&per_page=25&format=json&nojsoncallback=1`)
  .then(res => {
    photos = res.data.photos.photo; 
  })
  .then(() => {
    res.json(photos)
  })
})
