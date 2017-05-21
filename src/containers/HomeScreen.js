import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Home from '../components/Home'

const mapStateToProps = createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
