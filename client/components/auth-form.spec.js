import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Signup, Login} from './auth-form'
import {spy} from 'sinon';
import {createStore} from 'redux';


const adapter = new Adapter()
enzyme.configure({adapter})

const reducer = (state = { user: '' }, action) => {
  return state;
}

const store = createStore(reducer);

describe('Signp', () => {
  let signUp, onClickSpySign;

  beforeEach('Create component and event spy', () => {
    onClickSpySign = spy();
    signUp = shallow(<Signup store={store} onClick={onClickSpySign} />)
  })

  it('call passed in onClick prop with value of click ev', () => {
    signUp.simulate('click', { target : {name : 'Linda', email: 'linda@thismail.com', 'password': 'catzRkewl'} })
    expect(onClickSpySign.called).to.be.true;
  })
})

describe('Login', () => {
  let LogIn, onClickSpyLog;

  beforeEach('Create component and event spy', () => {
    onClickSpyLog = spy();
    LogIn = shallow(<Login store={store} onClick={onClickSpyLog} />)
  })

  it('call passed in onClick prop with value of click ev', () => {
    LogIn.simulate('click', { target : { email: 'linda@thismail.com', 'password': 'catzRkewl'} })
    expect(onClickSpyLog.called).to.be.true;
  })
})