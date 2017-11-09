import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {name, race, raceCompleted} = props

  return (
    <div className="container">
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
    raceCompleted: state.race.completed
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
