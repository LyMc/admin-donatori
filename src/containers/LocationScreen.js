import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Location from '../components/Location'

const mapStateToProps = createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Location)
