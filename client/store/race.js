import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_RACE = 'CREATE_RACE'
const IMPORT_RACE_FROM_STRAVA = 'IMPORT_RACE_FROM_STRAVA'
const GET_RACE = 'GET_RACE'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const createRace = race => ({type: CREATE_RACE, race})
const importRaceFromStrava = race => ({type: IMPORT_RACE_FROM_STRAVA, race})
const getRace = race => ({type: GET_RACE, race})

/**
 * THUNK CREATORS
 */
export const createRaceThunk = (race) => 
  dispatch => {
      axios.post(`/api/users/${race.userId}/races`, race)
        .then(res => {
          dispatch(createRace(res.data))
          history.push('/')
        })
        .catch(err => console.error(err))
      }

export const grabRaceFromStrava = (userId) => 
  dispatch =>
    axios.get(`/api/users/${userId}/strava`)
    .then(res => res.data)
    .then(stravaData => {
      axios.post(`/api/users/${userId}/races`, {
        name: stravaData.name,
        date: stravaData.start_date.split('T')[0],
        start: stravaData.start_date.split('T')[1],
        location: stravaData.location_country,
        coords: stravaData.end_latlng,
        userId: userId
      })
      .then(res => {
        dispatch(importRaceFromStrava({race: res.data, isCompleted: true}))
      })
    })
  .catch(err => console.error(err))

export const getRaceThunk = (userId) => 
  dispatch =>
    axios.get(`/api/users/${userId}/last`)
    .then(res => res.data)
    .then(raceData => dispatch(getRace(raceData)))

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case CREATE_RACE:
      return action.race
    case GET_RACE:
      return action.race
    case IMPORT_RACE_FROM_STRAVA:
      return action.race
    default:
      return state
  }
}
