import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, NewRace, AllRaces, Photos} from './components'
import {me, getRaceThunk, getRaceLocation, grabRaceFromStrava, fetchPicturesFromAPI} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, userId, race, getPictures} = this.props
    if (race.race) getPictures(race.race.coords)
    else if (race.id) getPictures(race.coords)
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/" render={() => <UserHome userId={userId} race={race}/>} />
                  <Route path="/home" render={() => <UserHome userId={userId} race={race}/>} />
                  <Route path="/newrace" render={() => <NewRace userId={userId} />} />
                  <Route path="/allraces" render={() => <AllRaces userId={userId} />} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    race: state.race
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      .then(res => {
        if (!res) return;
        if (res.user.stravaId) {
          console.log('strava data!', res)
          dispatch(grabRaceFromStrava(res.user.id))
        } else {
          dispatch(getRaceThunk(res.user.id))
        }
      })
      .catch(err => console.error(err))
    },
    getPictures (location) {
      dispatch(fetchPicturesFromAPI(location))
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  getRace: PropTypes.func,
  getLocation: PropTypes.func,
}
