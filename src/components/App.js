import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export default ({ children, isDrawerOpen, toggleDrawer }) =>
  <div>
    <Drawer open={ isDrawerOpen } onRequestChange={ toggleDrawer } containerStyle={{paddingTop: 64}}>
      <Link to="/"><MenuItem>Acasă</MenuItem></Link>
      <Link to="/locations"><MenuItem>Locații</MenuItem></Link>
    </Drawer>
    <AppBar
      title="Admin"
      iconElementLeft={ <IconButton onClick={ toggleDrawer }><NavigationClose/></IconButton> }
    />
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      paddingLeft: isDrawerOpen ? 270 : 15,
      paddingRight: 15,
      transition: 'padding-left .4s ease',
    }}>
      { children }
    </div>
  </div>
