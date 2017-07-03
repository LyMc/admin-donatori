import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const Field = ({ label, type, props, style }) => (
  <TextField floatingLabelText={ label } fullWidth value={ props.location.get(type) } onChange={ (_, value) => props.change(type, ['latitude', 'longitude'].indexOf(type) === -1 ? value : +value) } style={ style }/>
)
const getDay = (key) => key === 6 ? 0 : key + 1
const hoursValue = (hours, key) => hours.split(';')[getDay(key)]
const changeHours = (hours, value, key, change) => {
  let byDay = hours.split(';')
  byDay[getDay(key)] = value
  change('hours', byDay.join(';'))
}
export default class Location extends React.Component {
  render() {
    const { location, change, save } = this.props
    const props = { location, change }
    return (
      <div style={{ padding: '15px 0' }}>
        <Paper style={{ padding: 15 }}>
          <div>
            <Field label="Nume" type="name" props={ props }/>
            <Field label="Oraș" type="city" props={ props }/>
            <Field label="Stradă" type="address" props={ props }/>
            <Field label="Telefon" type="phone" props={ props }/>
            <Field label="Website" type="website" props={ props }/>
            <Field label="Link către hartă" type="addressLink" props={ props }/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Field label="Latitudine" type="latitude" props={ props } style={{ width: '49%' }}/>
            <Field label="Longitudine" type="longitude" props={ props } style={{ width: '49%' }}/>
          </div>
          <div style={{ marginTop: 15 }}>Program</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            { ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'].map((day, key) => (
              <TextField key={ key } floatingLabelText={ day } style={{ width: 130 }} value={ hoursValue(location.get('hours'), key) } onChange={ (_, value) => changeHours(location.get('hours'), value, key, change) }/>
            )) }
          </div>
          <div>
            <RaisedButton label="Actualizează" primary onTouchTap={ save }/>
          </div>
        </Paper>
      </div>
    )
  }
}
