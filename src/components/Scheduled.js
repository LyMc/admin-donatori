import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import ListIcon from 'material-ui/svg-icons/action/list'
import TodayIcon from 'material-ui/svg-icons/action/today'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import moment from 'moment'
import 'moment/locale/ro'
moment.locale('ro')

const min = +moment().utc().hour(1)
const max = +moment().utc().hour(22)

export default class Scheduled extends React.Component {
  constructor() {
    super()
    this.state = {
      tab: 0,
    }
    this.filterVisits = this.filterVisits.bind(this)
    this.filterUsers = this.filterUsers.bind(this)
  }
  filterVisits(visit) {
    const time = visit.get('date')
    if (this.state.tab === 0) {
      if (time > min && time < max) {
        return true
      }
    }
    if (this.state.tab === 1) {
      if (time > max) {
        return true
      }
    }
    if (this.state.tab === 2) {
      if (time < min) {
        return true
      }
    }
    return false
  }
  filterUsers(user) {
    const visits = user.get('visits')
    if (!visits) {
      return false
    }
    return visits.some(this.filterVisits)
  }

  render() {
    const { users, changeStatus } = this.props
    const { tab } = this.state
    return (
      <div style={{ paddingTop: 15, paddingBottom: 50 }}>
        <BottomNavigation selectedIndex={ tab } style={{ marginBottom: 15 }}>
          <BottomNavigationItem label="Astăzi" icon={ <TodayIcon/> } onTouchTap={ () => this.setState({ tab: 0 }) }/>
          <BottomNavigationItem label="Viitoare" icon={ <ListIcon/> } onTouchTap={ () => this.setState({ tab: 1 }) }/>
          <BottomNavigationItem label="Precedente" icon={ <HistoryIcon/> } onTouchTap={ () => this.setState({ tab: 2 }) }/>
        </BottomNavigation>
        { users.filter(this.filterUsers).map((user, key) => (
          <Card key={ key } style={{ marginBottom: 15 }}>
            <CardHeader actAsExpander showExpandableButton title={ user.getIn(['settings', 'name']) } subtitle={ user.get('visits').filter(this.filterVisits).first().get('status') + ' | ' + moment(user.get('visits').filter(this.filterVisits).first().get('date')).utc().format(tab === 0 ? 'HH:mm' : 'D MMMM') }/>
            <CardText expandable>
              <div>Grup Sanguin: { user.getIn(['profile', 'blood']) + user.getIn(['profile', 'rh']) }</div>
              <div>Greutate: { user.getIn(['profile', 'weight']) } kg</div>
              <div>Sexul: { user.getIn(['profile', 'sex']) === 'M' ? 'Bărbat' : 'Femeie' }</div>
              <div>Data nașterii: { moment(user.getIn(['profile', 'birthday'])).format('D MMMM Y') }</div>
            </CardText>
            { user.get('visits').filter(this.filterVisits).first().get('status') !== 'Anulată' && <CardActions>
              { user.get('visits').filter(this.filterVisits).first().get('status') === 'Programare' && <RaisedButton primary label="Confirmă" onTouchTap={ () => changeStatus(key, user.get('visits').filter(this.filterVisits).keySeq().first(), 'Confirmată') }/> }
              <FlatButton primary label="Anulează" onTouchTap={ () => changeStatus(key, user.get('visits').filter(this.filterVisits).keySeq().first(), 'Anulată') }/>
            </CardActions> }
          </Card>
        )).toArray() }
      </div>
    )
  }
}
