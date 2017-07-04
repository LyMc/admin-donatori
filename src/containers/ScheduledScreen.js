import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { users } from '../selectors'
import Scheduled from '../components/Scheduled'

const mapStateToProps = createStructuredSelector({ users })
const mapDispatchToProps = dispatch => ({
  changeStatus: (uid, visitKey, status) => dispatch({ type: 'CHANGE_USER_STATUS', payload: { uid, visitKey, status } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Scheduled)
