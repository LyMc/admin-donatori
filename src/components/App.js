import React from 'react'
import { Link, Route } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import NavigationClose from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'

import HomeScreen from '../containers/HomeScreen'
import NotificationsScreen from '../containers/NotificationsScreen'
import ScheduledScreen from '../containers/ScheduledScreen'
import LocationScreen from '../containers/LocationScreen'
import LettersScreen from '../containers/LettersScreen'

const MenuLink = ({ label, to, props: { windowData, toggleDrawer, location } }) => <Link to={ to } style={{ textDecoration: 'none' }} onTouchTap={() => windowData.width > 800 || toggleDrawer()}><MenuItem disabled={ location.pathname === to }>{ label }</MenuItem></Link>

export default ({ isDrawerOpen, toggleDrawer, logout, windowData, location, snacks, removeSnack }) => (
  <div>
    <Drawer open={ isDrawerOpen } onRequestChange={ toggleDrawer } containerStyle={{ paddingTop: 64 }} docked={ windowData.width > 800 }>
      <MenuLink label="Acasă" to="/" props={{ windowData, toggleDrawer, location }}/>
      <MenuLink label="Lansare Apel Donare" to="/notifications" props={{ windowData, toggleDrawer, location }}/>
      <MenuLink label="Lista Programaților" to="/scheduled" props={{ windowData, toggleDrawer, location }}/>
      <MenuLink label="Contul Centrului Nostru" to="/location" props={{ windowData, toggleDrawer, location }}/>
      <MenuLink label="Mesajele informative" to="/letters" props={{ windowData, toggleDrawer, location }}/>
      <FlatButton primary fullWidth onTouchTap={ logout } style={{ position: 'absolute', bottom: 0 }}>Deautentificare</FlatButton>
    </Drawer>
    <Snackbar
      open={ snacks.size > 0 }
      message={ snacks.size > 0 ? snacks.first() : '' }
      autoHideDuration={ 4000 }
      onRequestClose={ removeSnack }
    />
    <AppBar
      title="Admin"
      iconElementLeft={ <IconButton onClick={() => toggleDrawer()}><NavigationClose/></IconButton> }
    />
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      paddingLeft: isDrawerOpen ? 270 : 15,
      paddingRight: 15,
      overflow: 'hidden',
      transition: 'padding-left .4s ease',
    }}>
      <Route exact path="/" component={ HomeScreen }/>
      <Route exact path="/notifications" component={ NotificationsScreen }/>
      <Route exact path="/scheduled" component={ ScheduledScreen }/>
      <Route exact path="/location" component={ LocationScreen }/>
      <Route exact path="/letters" component={ LettersScreen }/>
    </div>
  </div>
)
