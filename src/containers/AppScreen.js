import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { BrowserRouter, Route } from 'react-router-dom'

import { isDrawerOpen, isUserSignedIn, windowData } from '../selectors'

import Loading from '../components/Loading'
import LoginScreen from './LoginScreen'
import App from '../components/App'

const AppRoute = connect(createStructuredSelector({ isDrawerOpen, windowData }), dispatch => ({
  toggleDrawer: (payload = null) => dispatch({ type: 'APP/TOGGLE_DRAWER', payload }),
  logout: () => dispatch({ type: 'DO_LOGOUT' }),
}))(App)

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
    if (this.props.isUserSignedIn === null) return <Loading/>
    else if (this.props.isUserSignedIn === false) return <LoginScreen/>
    else return (
        <BrowserRouter>
          <Route path="/" component={ AppRoute }/>
        </BrowserRouter>
      )
  }
}

const mapStateToProps = createStructuredSelector({ isUserSignedIn })
const mapDispatchToProps = dispatch => ({
  toggleDrawer: (payload = null) => dispatch({ type: 'APP/TOGGLE_DRAWER', payload }),
  resizeWindow: (width, height) => dispatch({ type: 'APP/RESIZE_WINDOW', payload: { width, height } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen)
