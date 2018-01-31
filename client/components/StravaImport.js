import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import {getAllRacesThunk} from '../store/allRaces';

export default class StravaImport extends Component {
  constructor() {
    super()
    this.state = {
      raceList: [],
      raceDate: '',
      submitted: false
    }
    this.findStravaRace = this.findStravaRace.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  findStravaRace(e) {
    e.preventDefault();
    let date = this.state.raceDate;
    date = date.replace(/\//ig, "-");
    axios.get(`api/users/${this.props.userId}/strava/${date}`)
    .then(res => res.data)
    .then(raceList => this.setState({raceList, submitted: true}))
  }

  handleChange(e) {
    this.setState({raceDate: e.target.value})
  }

  addRaceToList(race, userId) {
    axios.post(`/api/users/${userId}/races`, {
      name: race.name,
      date: race.start_date.split('T')[0],
      start: race.start_date.split('T')[1],
      location: race.location_country,
      coords: race.end_latlng,
      userId: userId
    })
    .then(() => this.setState({raceList: [], raceDate: '', submitted: false}))
  }

  render() {
    const {raceList, submitted, raceDate} = this.state;
    return (
      <div> 
        <h5>Import a Race From Strava: </h5>
        <form onSubmit={this.findStravaRace}>
          <label htmlFor="raceDate"><small>Race Date: </small>
            <input name="raceDate" type="text" value={raceDate} onChange={this.handleChange}/>
          </label>
          <button type="submit">Submit!</button>
        </form>
      {
        submitted && raceList.length === 0 && <h4>No Runs Found, Please Check Date</h4> 
      }
      {
        raceList && raceList.map(race => (
          <div key={race.id}>
            <span>{race.name}, {moment(race.start_date).format("dddd, MMMM Do YYYY")}</span> <a onClick={() => this.addRaceToList(race, this.props.userId)}>+ Add To Race List</a>
          </div>
        ))
      }
      </div>
    )
  }
}