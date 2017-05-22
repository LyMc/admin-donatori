import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import NavigationClose from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export default ({ children, isDrawerOpen, toggleDrawer, logout, windowData }) => (
  <div>
    <Drawer open={ isDrawerOpen } onRequestChange={ toggleDrawer } containerStyle={{ paddingTop: 64 }}>
      <Link to="/" style={{ textDecoration: 'none' }} onTouchTap={() => windowData.width > 800 || toggleDrawer()}><MenuItem>Acasă</MenuItem></Link>
      <Link to="/locations" style={{ textDecoration: 'none' }} onTouchTap={() => windowData.width > 800 || toggleDrawer()}><MenuItem>Locații</MenuItem></Link>
      <Link to="/users" style={{ textDecoration: 'none' }} onTouchTap={() => windowData.width > 800 || toggleDrawer()}><MenuItem>Utilizatori</MenuItem></Link>
      <FlatButton primary fullWidth onTouchTap={ logout } style={{
        position: 'absolute',
        bottom: 0,
      }}>Logout</FlatButton>
    </Drawer>
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
      { children }
    </div>
  </div>
)
