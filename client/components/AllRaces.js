import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import axios from 'axios';
import {getAllRacesThunk} from '../store/allRaces';

const AllRaces = (props) => {
  const {completedRaces, upcomingRaces, stravaId, getAllRaces} = props;
  if (!completedRaces.length && !upcomingRaces.length) getAllRaces();

  return (
    <div className="allRaces">
      { completedRaces.length > 0 && 
        <div>
          <h4>Completed Races</h4>
          <ul>
          {
            completedRaces.map(race => (
              <li key={race.id} className="allRaces-race">{race.name} ({moment(race.date).format("MM/DD/YY")}) ~ <a href={`http://www.shothotspot.com/hotspots/?nelng=${race.coords[1]+.005}&nelat=${race.coords[0]+.005}&swlat=${race.coords[0]-.005}&swlng=${race.coords[1]-.005}`}>Nearby Photo Spots</a> ~ <a onClick={() => props.deleteRace(race.id)}>Delete Race</a></li>
            ))
          }
          </ul>
        </div>
      }
      { upcomingRaces.length > 0 && 
        <div>
          <h4>Upcoming Races</h4>
          <ul>
          {
            upcomingRaces.map(race => (
              <li key={race.id} className="allRaces-race">{race.name} ({moment(race.date).format("MM/DD/YY")}) ~ Goal: {race.completionTime} ~ <a onClick={() => props.deleteRace(race.id)}>Delete Race</a></li>
            ))
          }
          </ul>
        </div>
      }
      {
        stravaId && <h5>Importing previous races from Strava is not currently supported</h5>
      }
      {
        upcomingRaces.length === 0 && completedRaces.length === 0 && <h4><a href="/newrace">Add a Race</a></h4> 
      }
    </div>   
  )
}

const mapState = (state) => {
  return {
    completedRaces: state.allRaces.completed || [],
    upcomingRaces: state.allRaces.upcoming || [],
    stravaId: state.user.stravaId || ''
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getAllRaces: () => dispatch(getAllRacesThunk(ownProps.userId)),
    deleteRace: (raceId) => {
      axios.delete(`api/users/${ownProps.userId}/race/${raceId}`)
      dispatch(getAllRacesThunk(ownProps.userId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllRaces)