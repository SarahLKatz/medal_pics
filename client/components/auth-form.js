import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container-fluid form-container">
      <form onSubmit={handleSubmit} name={name}>
        {
          name === 'signup' &&
          <div className="col-xs-10">
            <label htmlFor="userName"><small>Name</small></label>
            <input name="userName" type="text" />
          </div>
        }
        <div className="col-xs-10">
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div className="col-xs-10">
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div className="col-xs-10">
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/*<a href="/auth/google">{displayName} with Google</a>*/}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      if (name === 'signup') { 
        const name = evt.target.userName.value;
      }
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(name, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
