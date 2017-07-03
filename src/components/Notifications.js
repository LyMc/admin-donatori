import React from 'react'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Set } from 'immutable'

import muiTheme from '../muiTheme'

const bloodType = ['O', 'A', 'B', 'AB']
const RH = ['+', '-']

const toggleSet = (element, value) => {
  return element.has(value) ? element.delete(value) : element.add(value)
}

export default class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blood: new Set(),
      users: props.filteredUsers || 0,
      title: '',
      message: '',
      lastBloodCount: -1,
    }
    props.count([])
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.filteredUsers !== nextProps.filteredUsers) {
      this.setState({ users: Math.max(Math.round(this.props.filteredUsers ? this.state.users / this.props.filteredUsers * nextProps.filteredUsers : 0), 1) })
    }
    if (this.props.notificationsLoading && !nextProps.notificationsLoading) {
      this.setState({
        blood: new Set(),
        title: '',
        message: '',
      })
    }
  }
  componentDidUpdate() {
    if (this.state.lastBloodCount !== this.state.blood.size) {
      if (this.state.lastBloodCount === -1) {
        this.setState({ users: this.props.filteredUsers })
      }
      this.setState({ lastBloodCount: this.state.blood.size })
      this.props.count(this.state.blood.toArray())
    }
  }
  render() {
    const { filteredUsers, notificationsLoading, send } = this.props
    const { blood, users, title, message } = this.state
    return (
      <div style={{ padding: '15px 0' }}>
        <Paper style={{ padding: 15 }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15 }}>
            { RH.map(rh => <div key={ rh }>
              { bloodType.map(item => <Checkbox key={ item } label={ item + rh } onTouchTap={() => this.setState({ blood: toggleSet(blood, item + rh) })} checked={ blood.has(item + rh) }/>)}
            </div>)}
          </div>
          { filteredUsers > 0 && <div>
            <Slider min={ 0 } max={ filteredUsers } step={ 1 } value={ users } onChange={ (_, users) => this.setState({ users }) }/>
            <div style={{ textAlign: 'center' }}>Vor fi notificați <strong style={{ color: muiTheme.palette.primary1Color }}>{ users }</strong> donatori din <strong style={{ color: muiTheme.palette.primary1Color }}>{ filteredUsers }</strong> care corespund criteriilor selectate.</div>
          </div> }
          { filteredUsers <= 0 && <div>
            <div style={{ textAlign: 'center' }}>Nu există donatori cu grupele de sânge selectate.</div>
          </div> }
          <div>
            <TextField floatingLabelText="Titlu" fullWidth value={ title } onChange={ (_, title) => this.setState({ title }) }/>
            <TextField floatingLabelText="Mesaj" multiLine fullWidth rows={ 2 } value={ message } onChange={ (_, message) => this.setState({ message }) }/>
          </div>
          <div style={{ fontSize: 14, color: '#999', textAlign: 'right' }}>
            Se pot folosi variabile ce vor fi înlocuite cu datele utilizatorului: %NUME%, %GRUPA%, %RH%
          </div>
          <div>
            <RaisedButton label={ notificationsLoading ? 'Se trimite' : 'Trimite' } primary onTouchTap={ () => send({ blood: blood.toArray(), users, title, message }) } disabled={ users === 0 || notificationsLoading }/>
          </div>
        </Paper>
      </div>
    )
  }
}
