import React from 'react'
import './App.css'
import axios from 'axios'

import Register from './components/RegisterOrLogin'
import ProfilePage from './components/ProfilePage'

class App extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    // if (localStorage.getItem('user')) {
    //   const user = JSON.parse(localStorage.getItem('user')) // UNSAFE: DEV METHOD
    //   this.setState({ user })
    // }
    const user = await axios({
      method: 'GET',
      url: '/users/me',
    })
    if (user.data) {
      this.setState({ user: { user: user.data }})
    }
  }

  logout = async () => {
    // localStorage.removeItem('user')
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
          <Register updateUser={user => this.setState({ user })} />
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
