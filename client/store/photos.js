import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_PICTURES = 'FETCH_PICTURES'

/**
 * INITIAL STATE
 */
const defaultState = []

/**
 * ACTION CREATORS
 */
const fetchPictures = pictures => ({type: FETCH_PICTURES, pictures})

/**
 * THUNK CREATORS
 */
export const fetchPicturesFromAPI = (coords) => 
  dispatch => {
    if (coords) {
      axios.get(`/api/util/photos/${coords}`)
        .then(res => {
          dispatch(fetchPictures(res.data))
        })
        .catch(err => console.error(err))
      }
    }

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
      return action.pictures
    default:
      return state
  }
}
