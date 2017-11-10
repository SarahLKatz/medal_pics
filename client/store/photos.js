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
    if (location.lat) {
      let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=87adce3230bea8a46187c9da7f15a4aa&lat=${location.lat}&lon=${location.long}&format=json&nojsoncallback=1`
      axios.get(url)
        .then(res => {
          dispatch(fetchPictures(res.data.photos.photo.slice(0,10)))
          history.push('/photos')
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
