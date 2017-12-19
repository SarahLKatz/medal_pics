import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllRacesThunk} from '../store/allRaces';

const AllRaces = (props) => {
  console.log(props)
  // getAllRacesThunk(props.userId)
  // const {completedRaces, upcomingRaces} = this.props;

  return (
    <div>All The Races</div>   
  )
}

const mapState = (state) => {
  return {
    completedRaces: state.allRaces.completed || [],
    upcomingRaces: state.allRaces.upcoming || []
  }
}

const mapDispatch = (dispatch, ownProps) => {
  getAllRaces: dispatch(getAllRacesThunk(ownProps.userId))
}

export default connect(mapState, mapDispatch)(AllRaces)