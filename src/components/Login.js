import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default ({ loginData, doLogin, changeLoginData }) =>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }}>
    <div style={{
      width: 330,
    }}>
      <h3>Carnetul donatorului de sânge</h3>
      <TextField hintText="E-mail" type="email" fullWidth value={ loginData.email } onChange={ (_, value) => changeLoginData('email', value) } />
      <TextField hintText="Parola" type="password" fullWidth value={ loginData.password } onChange={ (_, value) => changeLoginData('password', value) } />
      <RaisedButton label="Autentifică-te" primary fullWidth onClick={ doLogin } />
    </div>
  </div>
