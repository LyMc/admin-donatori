import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { isDrawerOpen, isUserSignedIn } from '../selectors'

import LoginScreen from './LoginScreen'
import App from '../components/App'
import HomeScreen from './HomeScreen'
import LocationsScreen from './LocationsScreen'
import Loading from '../components/Loading'

class AppScreen extends React.Component {
  render () {
    const { isDrawerOpen, toggleDrawer, isUserSignedIn } = this.props
    return isUserSignedIn === null ? <Loading/> : isUserSignedIn
      ? <Router>
          <App isDrawerOpen={ isDrawerOpen } toggleDrawer={ toggleDrawer }>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/locations" component={LocationsScreen}/>
          </App>
        </Router>
      : <LoginScreen/>
  }
}

const mapStateToProps = createStructuredSelector({
  isDrawerOpen,
  isUserSignedIn,
})
const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch({ type: 'APP/TOGGLE_DRAWER' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen)
