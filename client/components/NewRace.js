import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createRaceThunk} from '../store';
import axios from 'axios';

const NewRace = (props) => {
  const { submitRace } = props;
  let hours = [12,1,2,3,4,5,6,7,8,9,10,11];
  let minutes = ['00','05','10','15','20','25','30','35','40','45','50','55'];

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
              <select className="time-select" name="hour">
                {
                  hours.map(hour => <option key={hour} value={hour}>{hour}</option>)
                }
              </select>
              <select className="time-select" name="mins">
                {
                  minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)
                }
              </select>
              <select name="amPm">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
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
            <input className="time-select" name="finishHour" type="text" size="2" />
            <input className="time-select" name="finishMin" type="text" size="2" />
            <input className="time-select" name="finishSec" type="text" size="2" />
            <small className="comments">(HH:MM:SS)</small>
            </label>
          </div>
          <div className="form-group col-xs-12">
            <button name="raceSubmit">Add Your Race</button>
          </div>
        </form>
      </div>
    )
}

const mapDispatch = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    submitRace(e) {
      e.preventDefault();
      let startTime;
      if (e.target.amPm.value === 'PM') {
        startTime = `${+e.target.hour.value + 12}:${e.target.mins.value}`
      } else {
        startTime = `${e.target.hour.value}:${e.target.mins.value}`
      }
      let completionTime = `${e.target.finishHour.value}:${e.target.finishMin.value}:${e.target.finishSec.value}`
      const race = {
        name: e.target.raceName.value,
        date: e.target.raceDate.value,
        start: startTime,
        location: e.target.raceLocale.value,
        completionTime: completionTime,
        userId: ownProps.userId
      }
      let coords;
      axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${e.target.raceLocale.value}`)
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

export default connect(() => ({}), mapDispatch)(NewRace)
