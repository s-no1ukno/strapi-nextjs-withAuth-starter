import React from 'react'
import axios from 'axios'
import { handleChange } from '../utils/inputs'

class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      mode: 'login'
    }

    this.handleChange = handleChange.bind(this)
  }
  

  handleSubmit = async (e) => {
    e.preventDefault()

    // sign the user up with strapi
    const { email, password, mode } = this.state

    const data = {
      identifier: email,
      email,
      password,
      username: email
    }

    let url = ''
    if (mode === 'login') {
      url = '/api/auth/local'
    }

    if (mode === 'signup') {
      url = '/api/auth/local/register'
    }

    const userCreationRes = await axios({
      method: 'POST',
      url,
      data
    })

    if (this.props.updateUser && typeof this.props.updateUser === 'function') {
      localStorage.setItem('user', JSON.stringify(userCreationRes.data))
      this.props.updateUser(userCreationRes.data)
    }
  }

  render() {
    const { email, password, mode } = this.state

    return (
      <div className="Register">
        
      <h1>{ mode }</h1>
      <form onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' id='email' value={email} onChange={ this.handleChange } />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' value={password} onChange={ this.handleChange } />
        </div>
        <button type='submit'>{ mode }</button>
      </form>

      {
        mode === 'login' &&
        <p onClick={() => this.setState({ mode: 'signup' })}>Want to signup instead?</p>
      }

      {
        mode === 'signup' &&
        <p onClick={() => this.setState({ mode: 'login' })}>Want to login instead?</p>
      }
      </div>
    )
  }
}

export default RegisterOrLogin