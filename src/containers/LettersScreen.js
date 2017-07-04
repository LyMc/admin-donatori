import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { letters } from '../selectors'
import Letters from '../components/Letters'

const mapStateToProps = createStructuredSelector({ letters })
const mapDispatchToProps = dispatch => ({
  save: (key, title, content) => dispatch({ type: 'SAVE_LETTER', payload: { key, title, content } }),
  add: (title, content) => dispatch({ type: 'ADD_LETTER', payload: { title, content } }),
  remove: (key) => dispatch({ type: 'REMOVE_LETTER', payload: key }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Letters)
