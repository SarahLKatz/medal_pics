/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {createRaceThunk, getRaceThunk} from './race'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {race: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('createRace', () => {
    it('eventually dispatches the CREATE RACE action', () => {
      const fakeRace = {
        name: 'TCS New York City Marathon',
        date: '11/5/2017',
        start: '10:12',
        location: 'Central Park',
        completionTime: '04:21:34',
        userId: 1
      }
      mockAxios.onPost(`/api/users/${fakeRace.userId}/races`, fakeRace).replyOnce(200, fakeRace)
      return store.dispatch(createRaceThunk(fakeRace))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_RACE')
          expect(actions[0].race).to.be.deep.equal(fakeRace)
        })
    })
  })

  describe('getRace', () => {
    it('eventually dispatches the GET RACE action', () => {
      const fakeRace = {
        race: {
          name: 'TCS New York City Marathon',
          date: '11/5/2017',
          start: '10:12',
          location: 'Central Park',
          completionTime: '04:21:34',
          userId: 1
        },
        completed: true
      }
      mockAxios.onGet(`/api/users/${fakeRace.race.userId}/races`).replyOnce(200, fakeRace)
      return store.dispatch(getRaceThunk(fakeRace.race.userId))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_RACE')
          expect(actions[0].race).to.be.deep.equal(fakeRace)
        })
    })
  })

})
