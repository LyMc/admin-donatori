import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { userData, location } from '../selectors'
import Location from '../components/Location'

const mapStateToProps = createStructuredSelector({ userData, location })
const mapDispatchToProps = dispatch => ({
  change: (field, value) => dispatch({ type: 'LOCATION/CHANGE', payload: { field, value }}),
  save: () => dispatch({ type: 'SAVE_LOCATION' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Location)
