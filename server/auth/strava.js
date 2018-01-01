const passport = require('passport')
const router = require('express').Router()
var StravaStrategy = require('passport-strava-oauth2').Strategy;
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {

  console.log('Strava client ID / secret not found. Skipping Strava OAuth.')

} else {

  const stravaConfig = {
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALLBACK
  }

  const strategy = new StravaStrategy(stravaConfig, (token, refreshToken, profile, done) => {
    const stravaId = profile.id
    const name = profile.displayName
    const email = profile._json.email

    User.find({where: {stravaId}})
      .then(foundUser => (foundUser)
        ? done(null, foundUser)
        : User.create({name, email, stravaId})
          .then(createdUser => done(null, createdUser))
      )
      .catch(done)
  })

  passport.use(strategy);

  router.get('/', passport.authenticate('strava'))

  router.get('/callback', passport.authenticate('strava', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });

  router.get('/callback', passport.authenticate('strava', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }))

}

// https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${callbackURL}

