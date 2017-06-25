import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default () =>
  <div style={{ padding: '15px 0' }}>
    <Paper style={{ padding: 15 }}>
      <div>
        <TextField floatingLabelText="Nume" fullWidth/>
        <TextField floatingLabelText="Oraș" fullWidth/>
        <TextField floatingLabelText="Stradă" fullWidth/>
        <TextField floatingLabelText="Telefon" fullWidth/>
        <TextField floatingLabelText="Website" fullWidth/>
        <TextField floatingLabelText="Link către hartă" fullWidth/>
        </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField floatingLabelText="Latitudine" style={{ width: '49%' }}/>
        <TextField floatingLabelText="Longitudine" style={{ width: '49%' }}/>
      </div>
      <div style={{ marginTop: 15 }}>Program</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <TextField floatingLabelText="Luni" style={{ width: 130 }}/>
        <TextField floatingLabelText="Marți" style={{ width: 130 }}/>
        <TextField floatingLabelText="Miercuri" style={{ width: 130 }}/>
        <TextField floatingLabelText="Joi" style={{ width: 130 }}/>
        <TextField floatingLabelText="Vineri" style={{ width: 130 }}/>
        <TextField floatingLabelText="Sâmbătă" style={{ width: 130 }}/>
        <TextField floatingLabelText="Duminică" style={{ width: 130 }}/>
      </div>
      <div>
        <RaisedButton label="Salvează" primary/>
      </div>
    </Paper>
  </div>