import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {name, race, raceCompleted, lat, long} = props;

  return (
    <div className="container-fluid">
      <h3>Welcome, {name}</h3>
      <div className="col-xs-12">
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
      <div className="container-fluid">
        {lat && raceCompleted && 
          <h5>Looking for some great race medal picture ideas? <a href={`http://www.shothotspot.com/hotspots/?nelng=${long+.005}&nelat=${lat+.005}&swlat=${lat-.005}&swlng=${long-.005}`}>Click here</a> for a map of popular local photo locations!</h5>
        }
      </div>
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
    lat: state.location[0],
    long: state.location[1]
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
