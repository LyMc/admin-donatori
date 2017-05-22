import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'

import ContentAdd from 'material-ui/svg-icons/content/add'
import LocationCard from './LocationCard'

export default ({ locationsData, editLocationData, add, edit, remove, close, change, changeIn, save }) => (
  <div style={{ paddingBottom: 75 }}>
    { locationsData.map((locations, city) => (
      <div key={ city }>
        <h2>{ city }</h2>
        <div>{ locations.map((location, key) => (
          <LocationCard key={ key } item={ location.toJS() } edit={() => edit(city, key)} remove={() => remove(city, key)}/>
        )).toArray() }</div>
      </div>
    )).toArray() }
    <FloatingActionButton secondary style={{ position: 'fixed', bottom: 15, right: 15 }} onTouchTap={ add }>
      <ContentAdd />
    </FloatingActionButton>
    <Dialog title={ editLocationData.key === '' ? 'Adaugă locație nouă' : 'Editează locația' } open={ editLocationData.open } onRequestClose={ close } autoScrollBodyContent
      actions={[
        <RaisedButton label={ editLocationData.key === '' ? 'Adaugă' : 'Salvează' } secondary onTouchTap={ save }/>,
        <FlatButton label="Anulează" primary onTouchTap={ close } style={{ marginLeft: 15 }}/>,
      ]}
    >
      <AutoComplete fullWidth floatingLabelText="Oraș" searchText={ editLocationData.city } onUpdateInput={(value) => change('city', value)} onNewRequest={(value) => change('city', value)} dataSource={locationsData.map((locations, city) => city).toArray()} openOnFocus />
      <TextField fullWidth floatingLabelText="Nume" value={ editLocationData.name } onChange={(_, value) => change('name', value)} />
      <TextField fullWidth floatingLabelText="Adresă" value={ editLocationData.address } onChange={(_, value) => change('address', value)} />
      <TextField fullWidth floatingLabelText="Link adresă" value={ editLocationData.addressLink } onChange={(_, value) => change('addressLink', value)} />
      <TextField fullWidth floatingLabelText="Program" value={ editLocationData.program } onChange={(_, value) => change('program', value)} />
      <TextField fullWidth floatingLabelText="Telefon" value={ editLocationData.phone } onChange={(_, value) => change('phone', value)} />
      <TextField fullWidth floatingLabelText="Link" value={ editLocationData.link } onChange={(_, value) => change('link', value)} />
      <TextField fullWidth floatingLabelText="Latitudine" value={ editLocationData.initialRegion.latitude } onChange={(_, value) => changeIn('initialRegion', 'latitude', +value)} />
      <TextField fullWidth floatingLabelText="Longitudine" value={ editLocationData.initialRegion.longitude } onChange={(_, value) => changeIn('initialRegion', 'longitude', +value)} />
      <TextField fullWidth floatingLabelText="Delta latitudine" value={ editLocationData.initialRegion.latitudeDelta } onChange={(_, value) => changeIn('initialRegion', 'latitudeDelta', +value)} />
      <TextField fullWidth floatingLabelText="Delta longitudine" value={ editLocationData.initialRegion.longitudeDelta } onChange={(_, value) => changeIn('initialRegion', 'longitudeDelta', +value)} />
    </Dialog>
  </div>
)
