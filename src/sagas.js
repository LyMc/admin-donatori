import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import { loginData, editLocationData } from './selectors'
import firebaseSaga from './firebase-saga'

function* doLogin() {
  const login = yield select(loginData)
  try {
    yield call(firebaseSaga.login, login.email, login.password)
  } catch (error) {
    console.log('error login', error)
  }
}
function* doLogout() {
  try {
    yield call(firebaseSaga.logout)
  } catch (error) {
    console.log('error logout', error)
  }
}
function* syncUser() {
  const channel = yield call(firebaseSaga.authChannel)
  while (true) {
    const { error, user } = yield take(channel)
    if (user) {
      yield put({ type: 'SIGN_IN', payload: { name: user.displayName, email: user.email, uid: user.uid } })
      yield put({ type: 'FETCH_USER_DATA' })
    } else {
      yield put({ type: 'SIGN_OUT' })
    }
    if (error) {
      console.log(error)
    }
  }
}
function* signUp() {
  //const register = yield select(registerData)
  try {
    yield console.log('sign up')
    //const user = yield call(firebaseSaga.register, register.email, register.password, register.name)
    //yield put({ type: 'SIGN_IN', payload: { name: user.displayName, email: user.email, uid: user.uid } })
  } catch (error) {
    console.log('error sign up', error)
  }
}
function* fetchAppData() {
  const channel = yield call(firebaseSaga.channel, '/app')
  while (true) {
    try {
      const data = yield take(channel)
      yield put({ type: 'LOCATIONS/SAVE', payload: (data && data.locations) || {} })
    } catch (error) {
      console.log('error fetch data', error)
    }
  }
}
function* fetchUsers() {
  const channel = yield call(firebaseSaga.channel, '/users')
  while (true) {
    try {
      const data = yield take(channel)
      yield put({ type: 'USERS/SAVE', payload: data || {} })
    } catch (error) {
      console.log('error fetch data', error)
    }
  }
}
function* saveLocation() {
  const location = yield select(editLocationData)
  const path = '/app/locations/' + location.city + '/'
  let data = { name: location.name }
  if (location.address) data.address = location.address
  if (location.addressLink) data.addressLink = location.addressLink
  if (location.program) data.program = location.program
  if (location.phone) data.phone = location.phone
  if (location.link) data.link = location.link
  if (location.initialRegion) data.initialRegion = location.initialRegion
  yield put({ type: 'EDIT_LOCATION/RESET' })
  try {
    if (location.key) {
      yield call(firebaseSaga.update, path + location.key, data)
    } else {
      yield call(firebaseSaga.create, path, data)
    }
  } catch (error) {
    console.log('error fetch data', error)
  }
}
function* removeLocation({ payload }) {
  try {
    yield call(firebaseSaga.delete, '/app/locations/' + payload.city + '/' + payload.key)
  } catch (error) {
    console.log('error fetch data', error)
  }
}

export default function* rootSaga() {
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('SYNC_USER', syncUser)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('FETCH_APP_DATA', fetchAppData)
  yield takeLatest('FETCH_USERS', fetchUsers)
  yield takeLatest('SAVE_LOCATION', saveLocation)
  yield takeLatest('REMOVE_LOCATION', removeLocation)
  yield put({ type: 'SYNC_USER' })
  //yield put({ type: 'FETCH_APP_DATA' })
  //yield put({ type: 'FETCH_USERS' })
}
