import React, {Component} from 'react';
// import store from '../store';
// import axios from 'axios';
import {connect} from 'react-redux'
import {createRaceThunk} from '../store'

const NewRace = (props) => {
  const { submitRace } = props;

  return(
      <div className="container">
        <h3>Add a New Race</h3>
        <form onSubmit={submitRace} name='newrace'>
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
            <label htmlFor="raceStart"><small>Race Start Time: </small>
              <input name="raceStart" type="text" />
              <small> (HH:MM 24-hour format)</small>
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
              <small> (HH:MM:SS format)</small>
            </label>
          </div>
          <div className="form-group col-xs-10">
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
      console.log(ownProps)
      const race = {
        name: e.target.raceName.value,
        date: e.target.raceDate.value,
        start: e.target.raceStart.value,
        location: e.target.raceLocale.value,
        completionTime: e.target.finishTime.value,
        userId: ownProps.userId
      }
      dispatch(createRaceThunk(race))
    }
  }
}

export default connect(mapState, mapDispatch)(NewRace)

// export default class NewRace extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: store.getState().user,
//       race: {}
//     }
//   }

//   submitRace(e) {
//     e.preventDefault();
//     const race = {
//       name: e.target.raceName.value,
//       date: e.target.raceDate.value,
//       start: e.target.raceStart.value,
//       location: e.target.raceLocale.value,
//       completionTime: e.target.finishTime.value,
//       userId: userId
//     }
//     axios.post(`/api/users/${race.userId}/races`, race)
//     .then(res => res.data)
//     .then(data => console.log(data))
//   }

//   render() {
//     return(
//       <div className="container">
//         <h3>Add a New Race</h3>
//         <form onSubmit={this.submitRace.bind(this)} name='newrace'>
//           <div className="form-group col-xs-10">
//             <label htmlFor="raceName"><small>Race Name: </small>
//               <input name="raceName" type="text" />
//             </label>
//           </div>
//           <div className="form-group col-xs-10">
//             <label htmlFor="raceDate"><small>Race Date: </small>
//               <input name="raceDate" type="text" />
//             </label>
//           </div>
//           <div className="form-group col-xs-10">
//             <label htmlFor="raceStart"><small>Race Start Time: </small>
//               <input name="raceStart" type="text" />
//               <small> (HH:MM 24-hour format)</small>
//             </label>
//           </div>
//           <div className="form-group col-xs-10">
//             <label htmlFor="raceLocale"><small>Race Location: </small>
//               <input name="raceLocale" type="text" />
//               <small> (for point-to-point race, enter finish location)</small>
//             </label>
//           </div>
//           <div className="form-group col-xs-10">
//             <label htmlFor="finishTime"><small>Estimated Completion Time: </small>
//               <input name="finishTime" type="text" />
//               <small> (HH:MM:SS format)</small>
//             </label>
//           </div>
//           <div className="form-group col-xs-10">
//             <button name="raceSubmit">Add Your Race</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }