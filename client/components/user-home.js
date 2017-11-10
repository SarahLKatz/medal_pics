import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Photos from './Photos'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {name, race, raceCompleted, lat, long} = props;

  return (
    <div className="col-xs-12 text-center main-content">
      <h3>Welcome, {name}</h3>
      <div>
      {
        raceCompleted ?
        <div>
          <h4>Congratulations on Your Race!</h4>
        </div>
        :
        <div>
          <h4>Good Luck on Your Race! Run Awesome!</h4>
        </div>
      }
      {/*<div>
        { raceCompleted &&
          (lat ?
            <h5>Looking for some great race medal picture ideas? <a href={`http://www.shothotspot.com/hotspots/?nelng=${long+.005}&nelat=${lat+.005}&swlat=${lat-.005}&swlng=${long-.005}`}>Click here</a> for a map of popular local photo locations!</h5>
          :
            <h5>Get a drink of water, eat a banana, and come back soon for some great photo op ideas!</h5>)
        }
        </div>
      */}
      <Photos />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    race: state.race,
    raceCompleted: state.race.completed,
    lat: state.location.lat,
    long: state.location.long
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
