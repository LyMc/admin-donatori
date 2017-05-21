import React from 'react'

export default ({ usersData }) => (
  <div>
    { usersData.map((user, uid) => (
      <div key={ uid }>
        <h3>{ uid }</h3>
        <h4>History</h4>
        { user.get('history') && JSON.stringify(user.get('history').toJS(), null, 4) }
        <h4>Settings</h4>
        { user.get('settings') && JSON.stringify(user.get('settings').toJS(), null, 4) }
      </div>
    )).toArray() }
  </div>
)