import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Scheduled from '../components/Scheduled'

const mapStateToProps = createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Scheduled)
