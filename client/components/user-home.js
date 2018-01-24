import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Photos from './Photos'
import {getRaceThunk, grabRaceFromStrava, fetchPicturesFromAPI} from '../store'
import moment from 'moment';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {userId, name, race, loadRace, raceCompleted, photos, queryStrava, stravaId, getPictures} = props;
  let lat, long, raceName, raceDate;
  if (userId && !race.race) {
    loadRace(userId)
  } else if (race.race.userId !== userId) {
    loadRace(userId)
  }
  if (race.race) {
    lat = race.race.coords[0];
    long = race.race.coords[1];
    raceName = race.race.name;
    raceDate = moment(race.race.date).format("dddd, MMMM Do, YYYY");
    if (photos.length < 1) getPictures(race.race.coords)
  } else if (stravaId) {
    queryStrava()
  }

  return (
    <div className="col-xs-12 text-center main-content">
      <h3>~ Welcome, {name} ~</h3>
      <div>
      {
        (race.race || race.id) ?
        <div>
        {
          (raceCompleted || stravaId) ?
          <div>
            <h4>Congratulations on Your Race, {raceName}, on {raceDate}!</h4>
            <p>
              Looking to take some awesome post-race medal pictures? Here are some pictures taken nearby that you can use for inspiration:
            </p>
            <Photos pictures={photos}/>
            {
              lat && 
              <p>
                Not finding your perfect medal picture? <a href={`http://www.shothotspot.com/hotspots/?nelng=${long+.005}&nelat=${lat+.005}&swlat=${lat-.005}&swlng=${long-.005}`}>Click here</a> for a link with more great ideas!
              </p>
            }
          </div>
          :
          <div>
            <h4>Good Luck on Your Race, {raceName} on {raceDate}! Run Awesome!</h4>
          </div>
        }
        </div>
        :
        <div>
          <h5>Looking for great race medal picture ideas? Click <Link to='/newrace'>here</Link> to add your next race, and come back after the race for inspiration!</h5>
          { stravaId && <button onClick={queryStrava}>Click Here To Import Your Latest Run From Strava</button> }
        </div>
      }
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    userId: state.user.id,
    name: state.user.name || 'Runner',
    race: state.race,
    raceCompleted: state.race.completed,
    photos: state.photos,
    stravaId: state.user.stravaId
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadRace(userId) {
      dispatch(getRaceThunk(userId))
    },
    getPictures (location) {
      dispatch(fetchPicturesFromAPI(location))
    },
    queryStrava () {
      dispatch(grabRaceFromStrava(ownProps.userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  race: PropTypes.object,
  raceCompleted: PropTypes.bool
}
