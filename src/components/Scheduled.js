import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import ListIcon from 'material-ui/svg-icons/action/list'
import TodayIcon from 'material-ui/svg-icons/action/today'
import HistoryIcon from 'material-ui/svg-icons/action/history'

const users = [{
  name: 'Mihai Ionescu',
  time: '07:30',
}, {
  name: 'Victor Locoman',
  time: '08:00',
}]

export default () =>
  <div style={{ paddingTop: 15, paddingBottom: 50 }}>
    <BottomNavigation selectedIndex={ 0 } style={{ marginBottom: 15 }}>
      <BottomNavigationItem label="Astăzi" icon={ <TodayIcon/> }/>
      <BottomNavigationItem label="Viitoare" icon={ <ListIcon/> }/>
      <BottomNavigationItem label="Precedente" icon={ <HistoryIcon/> }/>
    </BottomNavigation>
    { users.map((user, key) => (
      <Card key={ key } style={{ marginBottom: 15 }}>
        <CardHeader actAsExpander showExpandableButton
          title={ user.name }
          subtitle={ user.time }
        />
        <CardText expandable>
          <div>Grup Sanguin: A+</div>
          <div>Greutate: 78 kg</div>
          <div>Serie, număr buletin: XZ 123456</div>
          <div>CNP: 1920701123456</div>
          <div>Sexul: Bărbat</div>
          <div>Data nașterii: 1 iulie 1992</div>
          <div>Domiciliu: Buzău, sat. Sătuc, comuna Berca, str. Brașovului 198</div>
          <div>Tata: Sorel</div>
          <div>Mama: Galina</div>
          <div>Profesia (ocupația): Programator</div>
          <div>Întreprinderea (instituția): End Soft Design</div>
          <div>Adresă întreprindere: București, București, str. Calea Griviței 192</div>
        </CardText>
        <CardActions>
          <RaisedButton primary label="Confirmă"/>
          <FlatButton primary label="Anulează"/>
        </CardActions>
      </Card>
    )) }
  </div>
