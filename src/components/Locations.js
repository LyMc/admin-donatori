import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import ContentAdd from 'material-ui/svg-icons/content/add'
import LocationCard from './LocationCard'

export default ({ locationsData, editLocationData, add, edit, remove, close }) => (
  <div style={{ paddingBottom: 75 }}>
    { locationsData.map((locations, city) => (
      <div key={ city }>
        <h2>{ city }</h2>
        <div>{ locations.map((location, key) => (
          <LocationCard key={ key } item={ location.toJS() } edit={() => edit(key)} remove={() => remove(key)}/>
        )).toArray() }</div>
      </div>
    )).toArray() }
    <FloatingActionButton secondary style={{ position: 'fixed', bottom: 15, right: 15 }} onTouchTap={ add }>
      <ContentAdd />
    </FloatingActionButton>
    <Dialog title={ editLocationData.key === '' ? 'Adaugă locație nouă' : 'Editează locația' } open={ editLocationData.open } onRequestClose={ close } autoScrollBodyContent
      actions={[
        <RaisedButton label={ editLocationData.key === '' ? 'Adaugă' : 'Salvează' } secondary onTouchTap={ close }/>,
        <FlatButton label="Anulează" primary onTouchTap={ close } style={{ marginLeft: 15 }}/>,
      ]}
    >
      <TextField fullWidth floatingLabelText="Nume" value={ editLocationData.name } />
      <TextField fullWidth floatingLabelText="Adresă" value={ editLocationData.address } />
      <TextField fullWidth floatingLabelText="Link adresă" value={ editLocationData.addressLink } />
      <TextField fullWidth floatingLabelText="Program" value={ editLocationData.program } />
      <TextField fullWidth floatingLabelText="Telefon" value={ editLocationData.phone } />
      <TextField fullWidth floatingLabelText="Link" value={ editLocationData.link } />
      <TextField fullWidth floatingLabelText="Latitudine" value={ editLocationData.initialRegion.latitude } />
      <TextField fullWidth floatingLabelText="Longitudine" value={ editLocationData.initialRegion.longitude } />
      <TextField fullWidth floatingLabelText="Delta latitudine" value={ editLocationData.initialRegion.latitudeDelta } />
      <TextField fullWidth floatingLabelText="Delta longitudine" value={ editLocationData.initialRegion.longitudeDelta } />
    </Dialog>
  </div>
)
