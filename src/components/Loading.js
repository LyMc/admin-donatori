import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export default () =>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  }} >
    <CircularProgress/>
    <div style={{ color: '#999', paddingTop: 15, }}>Validare utilizator</div>
  </div>