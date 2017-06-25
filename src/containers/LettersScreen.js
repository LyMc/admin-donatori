import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Letters from '../components/Letters'

const mapStateToProps = createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Letters)
