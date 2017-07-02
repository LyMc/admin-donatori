import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import { filteredUsers, notificationsLoading } from '../selectors'
import Notifications from '../components/Notifications'

const mapStateToProps = createStructuredSelector({ filteredUsers, notificationsLoading })
const mapDispatchToProps = dispatch => ({
  count: (payload) => dispatch({ type: 'COUNT_USERS', payload }),
  send: (payload) => dispatch({ type: 'SEND_NOTIFICATION', payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
