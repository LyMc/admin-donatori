import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { isDrawerOpen, isUserSignedIn } from '../selectors'

import Loading from '../components/Loading'
import LoginScreen from './LoginScreen'
import App from '../components/App'
import HomeScreen from './HomeScreen'
import LocationsScreen from './LocationsScreen'
import UsersScreen from './UsersScreen'

class AppScreen extends React.Component {
  render() {
    const { isDrawerOpen, toggleDrawer, isUserSignedIn, logout } = this.props
    return isUserSignedIn === null ? <Loading/> : isUserSignedIn ? (
      <Router>
        <App isDrawerOpen={ isDrawerOpen } toggleDrawer={ toggleDrawer } logout={ logout }>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/locations" component={LocationsScreen}/>
          <Route exact path="/users" component={UsersScreen}/>
        </App>
      </Router>
    ) : <LoginScreen/>
  }
}

const mapStateToProps = createStructuredSelector({
  isDrawerOpen, isUserSignedIn,
})
const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch({ type: 'APP/TOGGLE_DRAWER' }),
  logout: () => dispatch({ type: 'DO_LOGOUT' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen)
