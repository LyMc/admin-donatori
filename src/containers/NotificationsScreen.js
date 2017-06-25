import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Notifications from '../components/Notifications'

const mapStateToProps = createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
