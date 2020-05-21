import React from 'react'
import './App.css'
import axios from 'axios'

import RegisterOrLogin from './components/RegisterOrLogin'
import ProfilePage from './components/ProfilePage'

class App extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    const user = await axios({
      method: 'GET',
      url: '/users/me',
    })

    if (user.data) {
      this.setState({ user: { user: user.data }})
    }
  }

  logout = async () => {
    await axios({
      method: 'GET',
      url:'/users/logout'
    })
    this.setState({ user: null })
  }

  render() {
    const { user } = this.state
    
    return (
      <div className="App">
        App
        {
          !user &&
          <RegisterOrLogin updateUser={user => this.setState({ user })} />
        }

        {
          user &&
          <div>
            <ProfilePage user={user} />
            <button onClick={ this.logout }>Logout</button>
          </div>
        }
      </div>
    )
  }
}

export default App
