import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { isDrawerOpen, isUserSignedIn, windowData } from '../selectors'

import Loading from '../components/Loading'
import LoginScreen from './LoginScreen'
import App from '../components/App'
import HomeScreen from './HomeScreen'
import LocationsScreen from './LocationsScreen'
import UsersScreen from './UsersScreen'

class AppScreen extends React.Component {
  constructor() {
    super()
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.props.toggleDrawer(width > 800)
    this.props.resizeWindow(width, height)
  }

  render() {
    const { isDrawerOpen, toggleDrawer, isUserSignedIn, windowData, logout } = this.props
    return isUserSignedIn === null ? <Loading/> : isUserSignedIn ? (
      <Router>
        <App isDrawerOpen={ isDrawerOpen } toggleDrawer={ toggleDrawer } logout={ logout } windowData={ windowData }>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/locations" component={LocationsScreen}/>
          <Route exact path="/users" component={UsersScreen}/>
        </App>
      </Router>
    ) : <LoginScreen/>
  }
}

const mapStateToProps = createStructuredSelector({
  isDrawerOpen, isUserSignedIn, windowData,
})
const mapDispatchToProps = dispatch => ({
  toggleDrawer: (payload = null) => dispatch({ type: 'APP/TOGGLE_DRAWER', payload }),
  logout: () => dispatch({ type: 'DO_LOGOUT' }),
  resizeWindow: (width, height) => dispatch({ type: 'APP/RESIZE_WINDOW', payload: { width, height } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen)
