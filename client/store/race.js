import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_RACE = 'CREATE_RACE'
const GET_RACE = 'GET_RACE'
const CHECK_RACE_COMPLETION = 'CHECK_RACE_COMPLETION'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const createRace = race => ({type: CREATE_RACE, race})
const getRace = race => ({type: GET_RACE, race})

/**
 * THUNK CREATORS
 */
export const createRaceThunk = (race) => 
  dispatch =>
    axios.post(`/api/users/${race.userId}/races`, race)
      .then(res => {
        dispatch(createRace(res.data))
        history.push('/home')
      })
      .catch(err => console.error(err))

export const getRaceThunk = (userId) => 
  dispatch =>
    axios.get(`/api/users/${userId}/races`)
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
    default:
      return state
  }
}
