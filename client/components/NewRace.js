import React, {Component} from 'react';

export default class NewRace extends Component {
  constructor() {
    super();
    this.state = {
      race: {}
    }
  }

  submitRace(e) {
    e.preventDefault();
    const race = {
      name: e.target.raceName.value,
      date: e.target.raceDate.value,
      location: e.target.raceLocale.value,
      completionTime: e.target.finishTime.value
    }
    console.log(race);
  }

  render() {
    return(
      <div className="container">
        <h3>Add a New Race</h3>
        <form onSubmit={this.submitRace} name='newrace'>
          <div className="form-group col-xs-10">
            <label htmlFor="raceName"><small>Race Name: </small>
              <input name="raceName" type="text" />
            </label>
          </div>
          <div className="form-group col-xs-10">
            <label htmlFor="raceDate"><small>Race Date: </small>
              <input name="raceDate" type="text" />
            </label>
          </div>
          <div className="form-group col-xs-10">
            <label htmlFor="raceLocale"><small>Race Location: </small>
              <input name="raceLocale" type="text" />
              <small> (for point-to-point race, enter finish location)</small>
            </label>
          </div>
          <div className="form-group col-xs-10">
            <label htmlFor="finishTime"><small>Estimated Completion Time: </small>
              <input name="finishTime" type="text" />
            </label>
          </div>
          <div className="form-group col-xs-10">
            <button name="raceSubmit">Add Your Race</button>
          </div>
        </form>
      </div>
    )
  }
}