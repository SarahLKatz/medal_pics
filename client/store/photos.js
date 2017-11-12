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
export const fetchPicturesFromAPI = (location) => 
  dispatch => {
    if (location) {
      let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2f859e87cf731ecfe3d71d92d0daa62b&tags=landmarks&lat=${location[0]}&lon=${location[1]}&per_page=25&format=json&nojsoncallback=1`
      axios.get(url)
        .then(res => {
          dispatch(fetchPictures(res.data.photos.photo))
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
