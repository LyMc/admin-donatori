import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { usersData } from '../selectors'

import Users from '../components/Users'

const mapStateToProps = createStructuredSelector({
  usersData
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
