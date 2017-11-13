import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createRaceThunk} from '../store';
import axios from 'axios';

const NewRace = (props) => {
  const { submitRace } = props;

  return(
      <div className="container">
        <h3>Add a New Race</h3>
        <form onSubmit={submitRace} name="newrace" className="add-race">
          <div className="form-group col-xs-12">
            <label htmlFor="raceName"><small>Race Name: </small>
              <input name="raceName" type="text" />
            </label>
          </div>
          <div className="form-group col-xs-12">
            <label htmlFor="raceDate"><small>Race Date: </small>
              <input name="raceDate" type="text" />
            </label>
          </div>
          <div className="form-group col-xs-12">
            <label htmlFor="raceStart"><small>Race Start Time: </small>
              <input name="raceStart" type="text" />
              <small className="comments">(HH:MM 24-hour format)</small>
            </label>
          </div>
          <div className="form-group col-xs-12">
            <label htmlFor="raceLocale"><small>Race Location: </small>
              <input name="raceLocale" type="text" />
              <small className="comments">(for point-to-point race, enter finish location)</small>
            </label>
          </div>
          <div className="form-group col-xs-12">
            <label htmlFor="finishTime"><small>Estimated Completion Time: </small>
              <input name="finishTime" type="text" />
              <small className="comments">(HH:MM:SS format)</small>
            </label>
          </div>
          <div className="form-group col-xs-12">
            <button name="raceSubmit">Add Your Race</button>
          </div>
        </form>
      </div>
    )
}

const mapState = (state) => {
  return {
    userId: state.user.id,
    race: state.race
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    submitRace(e) {
      e.preventDefault();
      const race = {
        name: e.target.raceName.value,
        date: e.target.raceDate.value,
        start: e.target.raceStart.value,
        location: e.target.raceLocale.value,
        completionTime: e.target.finishTime.value,
        userId: ownProps.userId
      }
      let coords;
      axios.get(`http://nominatim.openstreetmap.org/search?format=json&q=${e.target.raceLocale.value}`)
      .then(res => {
        const location = res.data[0];
        coords = [location.lat, location.lon];
      })
      .then(() => {
        race.coords = coords;
        dispatch(createRaceThunk(race))
      })
      .catch(err => console.error(err))
    }
  }
}

export default connect(mapState, mapDispatch)(NewRace)
