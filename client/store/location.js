import history from '../history'
import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_LOCATION = 'GET_LOCATION'

/**
 * INITIAL STATE
 */
const defaultLocation = {}

/**
 * ACTION CREATORS
 */
const getLocation = location => ({type: GET_LOCATION, location})

/**
 * THUNK CREATORS
 */
export const getCurrentLocation = () => 
  dispatch => {
    let lat, long;
    navigator.geolocation.getCurrentPosition(location => {
      lat = location.coords.latitude;
      long = location.coords.longitude;
      dispatch(getLocation({lat, long}))
    })
  }

export const getRaceLocation = (race) => 
  dispatch => {
    console.log('race:', race)
      axios.get(`http://nominatim.openstreetmap.org/search?format=json&q=${race.location}`)
      .then(res => {
        const location = res.data[0];
        dispatch(getLocation({lat: location.lat, long: location.lon }))
      })
      .catch(err => console.error(err))}

/**
 * REDUCER
 */
export default function (state = defaultLocation, action) {
  switch (action.type) {
    case GET_LOCATION:
      return action.location
    default:
      return state
  }
}
