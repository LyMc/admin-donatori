import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { locationsData, editLocationData } from '../selectors'

import Locations from '../components/Locations'

const mapStateToProps = createStructuredSelector({
  locationsData, editLocationData
})
const mapDispatchToProps = dispatch => ({
  add: () => dispatch({ type: 'EDIT_LOCATION/OPEN' }),
  edit: (payload) => dispatch({ type: '' }, payload),
  remove: (payload) => dispatch({ type: '' }, payload),
  close: () => dispatch({ type: 'EDIT_LOCATION/CLOSE' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
