import React from 'react'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import muiTheme from '../muiTheme'

const bloodType = ['O', 'A', 'B', 'AB']
const RH = ['+', '-']

export default () =>
  <div style={{ padding: '15px 0' }}>
    <Paper style={{ padding: 15 }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15 }}>{ RH.map(rh => <div key={ rh }>
        { bloodType.map(item => <Checkbox key={ item } label={ item + rh }/>)}
      </div>)}</div>
      <Slider
        min={ 0 }
        max={ 500 }
        step={ 1 }
        value={ 50 }
      />
      <div style={{ textAlign: 'center' }}>Vor fi notificați <strong style={{ color: muiTheme.palette.primary1Color }}>50</strong> donatori din <strong style={{ color: muiTheme.palette.primary1Color }}>500</strong> care corespund criteriilor selectate.</div>
      <div>
        <TextField floatingLabelText="Titlu" fullWidth value="Este nevoie de sânge"/>
        <TextField floatingLabelText="Mesaj" multiLine fullWidth rows={ 2 } value="Bună %NUME%,Este nevoie de sânge %GRUPA%%RH% în Centrul de transfuzie sanguină București"/>
      </div>
      <div style={{ fontSize: 14, color: '#999', textAlign: 'right' }}>
        Se pot folosi variabile ce vor fi înlocuite cu datele utilizatorului: %NUME%, %GRUPA%, %RH%
      </div>
      <div>
        <RaisedButton label="Trimite" primary/>
      </div>
    </Paper>
  </div>
