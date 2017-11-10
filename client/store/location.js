import history from '../history'

/**
 * ACTION TYPES
 */
const GET_LOCATION = 'GET_LOCATION'

/**
 * INITIAL STATE
 */
const defaultLocation = []

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
