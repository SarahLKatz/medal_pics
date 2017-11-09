import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Signup} from './auth-form'
import {spy} from 'sinon';
import {createStore} from 'redux';


const adapter = new Adapter()
enzyme.configure({adapter})

const reducer = (state = { user: '' }, action) => {
  return state;
}

const store = createStore(reducer);

describe('SignUp', () => {
  let signUp, onClickSpy;

  beforeEach('Create component and event spy', () => {
    onClickSpy = spy();
    signUp = shallow(<Signup store={store} onClick={onClickSpy} />)
  })

  it('call passed in onClick prop with value of click ev', () => {
    signUp.simulate('click', { target : {name : 'Linda', email: 'linda@thismail.com', 'password': 'catzRkewl'} })
    expect(onClickSpy.called).to.be.true;
  })
})