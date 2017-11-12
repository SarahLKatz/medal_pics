import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Photos from './Photos'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {name, race, raceCompleted, photos} = props;
  let lat, long;
  if (race.race) {
    lat = race.race.coords[0];
    long = race.race.coords[1];
  }

  return (
    <div className="col-xs-12 text-center main-content">
      <h3>~ Welcome, {name} ~</h3>
      <div>
      {
        race.race ?
        <div>
        {
          raceCompleted ?
          <div>
            <h4>Congratulations on Your Race!</h4>
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
            <h4>Good Luck on Your Race! Run Awesome!</h4>
          </div>
        }
        </div>
        :
        <div>
          <h5>Looking for great race medal picture ideas? Click <Link to='/newrace'>here</Link> to add your next race, and come back after the race for inspiration!</h5>
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
    name: state.user.name || 'Runner',
    race: state.race,
    raceCompleted: state.race.completed,
    photos: state.photos
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  race: PropTypes.object,
  raceCompleted: PropTypes.bool
}
