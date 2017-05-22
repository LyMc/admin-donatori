import React from 'react'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import AccessTime from 'material-ui/svg-icons/device/access-time'
import Phone from 'material-ui/svg-icons/communication/phone'
import Link from 'material-ui/svg-icons/content/link'
import Public from 'material-ui/svg-icons/social/public'

export default ({ item, edit, remove }) => (
  <Card style={{ marginBottom: 15, overflow: 'hidden' }}>
    <CardTitle
      title={ item.name }
      subtitle={ item.address }
    />
    <CardText>
      <List>
        { item.addressLink && <ListItem primaryText={ item.addressLink } leftIcon={ <Link/> }/> }
        { item.program && <ListItem primaryText={ item.program } leftIcon={ <AccessTime/> }/> }
        { item.phone && <ListItem primaryText={ item.phone } leftIcon={ <Phone/> }/> }
        { item.link && <ListItem primaryText={ item.link } leftIcon={ <Public/> }/> }
      </List>
    </CardText>
    { item.initialRegion && item.initialRegion.latitude &&
    <CardMedia overlay={<CardTitle subtitle={ item.initialRegion.latitude + ' ' + item.initialRegion.longitude }/>}>
      <div style={{ backgroundColor: '#aaa', height: 200 }}/>
    </CardMedia> }
    <CardActions>
      <RaisedButton label="Editează" secondary onTouchTap={ edit }/>
      <FlatButton label="Șterge" primary onTouchTap={ remove }/>
    </CardActions>
  </Card>
)