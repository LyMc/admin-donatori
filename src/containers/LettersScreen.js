import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { letters } from '../selectors'
import Letters from '../components/Letters'

const mapStateToProps = createStructuredSelector({ letters })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Letters)
