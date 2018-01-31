import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_RACES = 'GET_ALL_RACES'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const getAllRaces = allRaces => ({type: GET_ALL_RACES, allRaces})

/**
 * THUNK CREATORS
 */
export const getAllRacesThunk = (userId) => 
  dispatch => {
    axios.get(`/api/users/${userId}/races`)
      .then(res => {
        dispatch(getAllRaces(res.data))
      })
      .catch(err => console.error(err))
    }


/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_RACES:
      return action.allRaces
    default:
      return state
  }
}
