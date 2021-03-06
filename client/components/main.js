import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div className="container">
      <h3 className="col-xs-12 text-center">Pics Or You Didn't Medal</h3>
      <nav className="text-center nav-top">
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/newrace">Add A Race</Link>
              <Link to="/allraces">My Races</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <div className="main-content">
        {children}
      </div>
      <hr />
      <div className="apis">
        <a href="http://www.strava.com"><img src={__dirname + 'api_logo_pwrdBy_strava_horiz_light.png'} /></a>
        <span>Photos From <a href="http://www.flickr.com" target="_blank">Flickr</a></span>
        <span>Location Information Helped By <a href="https://nominatim.openstreetmap.org/" target="_blank">Nominatim</a></span>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
