import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_RACE = 'CREATE_RACE'
const CHECK_RACE_COMPLETION = 'CHECK_RACE_COMPLETION'

/**
 * INITIAL STATE
 */
const defaultRace = {}

/**
 * ACTION CREATORS
 */
const createRace = race => ({type: CREATE_RACE, race})
const checkRaceCompletion = raceCompleted => ({type: CHECK_RACE_COMPLETION, raceCompleted })

/**
 * THUNK CREATORS
 */
 ////START HERE
export const createRaceThunk = (race) => 
  dispatch =>
    axios.post(`/api/users/${race.userId}/races`, race)
      .then(res => {
        console.log(res.data)
        dispatch(createRace(res.data))
        history.push('/home')
      })
      .catch(err => console.error(err))

export const isRaceCompleted = (race) => 
  dispatch => 
    axios.get(`/api/users/${race.userId}/races`)
    .then(res => res.data)
    .then(raceData => dispatch(checkRaceCompletion(raceData.completed)))
    .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function (state = defaultRace, action) {
  switch (action.type) {
    case CREATE_RACE:
      return action.race
    case CHECK_RACE_COMPLETION:
      return race.completed
    default:
      return state
  }
}
