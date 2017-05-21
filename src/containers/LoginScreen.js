import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { loginData } from '../selectors'
import Login from '../components/Login'

const mapStateToProps = createStructuredSelector({
  loginData,
})
const mapDispatchToProps = dispatch => ({
  doLogin: () => dispatch({ type: 'DO_LOGIN' }),
  changeLoginData: (field, value) => dispatch({ type: 'CHANGE_LOGIN_DATA', payload: { field, value } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
