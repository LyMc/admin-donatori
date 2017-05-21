import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { locationsData, editLocationData } from '../selectors'

import Locations from '../components/Locations'

const mapStateToProps = createStructuredSelector({
  locationsData, editLocationData,
})
const mapDispatchToProps = dispatch => ({
  add: () => dispatch({ type: 'EDIT_LOCATION/CHANGE', payload: { field: 'open', value: true } }),
  edit: (city, key) => dispatch({ type: 'EDIT_LOCATION/EDIT', payload: {city, key}}),
  remove: (city, key) => dispatch({ type: 'REMOVE_LOCATION', payload: {city, key} }),
  close: () => dispatch({ type: 'EDIT_LOCATION/RESET' }),
  change: (field, value) => dispatch({ type: 'EDIT_LOCATION/CHANGE', payload: { field, value } }),
  changeIn: (field, subfield, value) => dispatch({ type: 'EDIT_LOCATION/CHANGE_IN', payload: { field, subfield, value } }),
  save: () => dispatch({ type: 'SAVE_LOCATION' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
