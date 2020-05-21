import React from 'react'
import { handleChange } from '../utils/inputs'
import Axios from 'axios'

class ProfilePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      bio: 'The Bio',
      pokemon: 'Pikachu'
    }

    this.handleChange = handleChange.bind(this)

  }

  componentDidMount() {
    const { bio, favorite_pokemon } = this.props.user.user
    this.setState({ bio, pokemon: favorite_pokemon })
  }

  
  handleSubmit = async e => {
    e.preventDefault()

    const { bio, pokemon } = this.state
    
    const data = {
      bio,
      favorite_pokemon: pokemon
    }

    const userId = this.props.user.user.id

    const updateUserRes = await Axios({
      method: 'PUT',
      url: `/users/${userId}`,
      data
    })

    console.log(updateUserRes)
  }
  
  render() {

    const { bio, pokemon } = this.state

    return (
      <div className="ProfilePage">
        ProfilePage
        <form onSubmit={ this.handleSubmit }>
          <div>
            <label htmlFor='bio'>Bio</label>
            <input type='text' name='bio' id='bio' value={ bio } onChange={ this.handleChange } />
          </div>
          <div>
            <label htmlFor='pokemon'>What's your favorite Pokemon?</label>
            <input type='text' name='pokemon' id='pokemon' value={ pokemon } onChange={ this.handleChange } />
          </div>
          <button type='submit'>Update your profile</button>
        </form>

       
      </div>
    )
  }
}

export default ProfilePage