import { call, put, take, takeLatest, select } from 'redux-saga/effects'
import { loginData, notifications, location, userAdmin } from './selectors'
import firebaseSaga from './firebase-saga'
//import request from './request'

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
      const admin = yield call(firebaseSaga.get, 'admins/' + user.uid)
      if (admin) {
        yield put({ type: 'SIGN_IN', payload: { name: user.displayName, email: user.email, uid: user.uid, admin } })
        yield put({ type: 'FETCH_NOTIFICATIONS' })
        yield put({ type: 'FETCH_LOCATION', payload: admin })
        yield put({ type: 'FETCH_LETTERS' })
      }
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
function* removeLocation({ payload }) {
  try {
    yield call(firebaseSaga.delete, '/app/locations/' + payload.city + '/' + payload.key)
  } catch (error) {
    console.log('error fetch data', error)
  }
}

function* fetchNotifications() {
  const channel = yield call(firebaseSaga.channel, '/notifications')
  let first = true
  while (true) {
    try {
      const data = yield take(channel)
      yield put({ type: 'NOTIFICATIONS/SAVE', payload: data || {} })
      if (first) {
        first = false
        yield put({ type: 'COUNT_USERS', payload: [] })
      }
    } catch (error) {
      console.error('fetchNotifications')
    }
  }
}
function* countUsers({ payload: blood }) {
  const _notifications = yield select(notifications)
  const count = _notifications.reduce((acc, userNotifications, uid) => {
    if (!userNotifications.has('BLOOD') || !userNotifications.get('BLOOD')) {
      return acc
    }
    if (blood.length === 0) {
      return ++acc
    }
    return blood.indexOf(userNotifications.get('BLOOD')) === -1 ? acc : ++acc
  }, 0)
  yield put({ type: 'FILTERED_USERS/SET', payload: count })
}
function* sendNotification({ payload: notification }) {
  yield put({ type: 'NOTIFICATIONS/LOADING' })
  const _notifications = yield select(notifications)
  let sent = 0
  for (let [uid, userNotifications] of _notifications) {
    if (sent >= notification.users || !userNotifications.has('BLOOD') || !userNotifications.get('BLOOD') || (notification.blood.length > 0 && notification.blood.indexOf(userNotifications.get('BLOOD')) === -1)) continue
    if (userNotifications.has('EXPO_TOKEN') && userNotifications.get('EXPO_TOKEN')) {
      const requestURL = 'https://exp.host/--/api/v2/push/send'
      const fetchData = {
        method: 'POST', headers: {
          'Content-Type': 'text/plain'
        }, body: JSON.stringify({ to: userNotifications.get('EXPO_TOKEN'), body: notification.title }), mode: 'no-cors'
      }
      try {
        yield call(fetch, requestURL, fetchData)
        //yield call(request, requestURL, fetchData)
      } catch (error) {
        console.error(error)
      }
    }
    yield call(firebaseSaga.create, '/notifications/' + uid + '/', { title: notification.title, message: notification.message })
    sent++
  }
  yield put({ type: 'NOTIFICATIONS/LOADED' })
  yield put({ type: 'SNACKS/ADD', payload: sent === 1 ? 'O notificare a fost trimisă cu succes' : sent + ' notificări au fost trimise cu succes' })
}
function* fetchLocation({ payload: locationKey }) {
  const channel = yield call(firebaseSaga.channel, '/app/locations/' + locationKey)
  while (true) {
    try {
      const data = yield take(channel)
      if (data) {
        yield put({ type: 'LOCATION/SET', payload: data })
      }
    } catch (error) {
      console.error('fetchLocation')
    }
  }
}
function* saveLocation() {
  const _location = yield select(location)
  const locationKey = yield select(userAdmin)
  try {
    yield call(firebaseSaga.update, '/app/locations/' + locationKey, _location.toObject())
    yield put({ type: 'SNACKS/ADD', payload: 'Informațiile au fost actualizate' })
  } catch (error) {
    console.error('saveLocation', error)
  }
}
function* fetchLetters() {
  const channel = yield call(firebaseSaga.channel, '/app/letters/')
  while (true) {
    try {
      const data = yield take(channel)
      yield put({ type: 'LETTERS/SET', payload: data || {} })
    } catch (error) {
      console.error('fetchLetters')
    }
  }
}

export default function* rootSaga() {
  yield takeLatest('DO_LOGIN', doLogin)
  yield takeLatest('SYNC_USER', syncUser)
  yield takeLatest('DO_LOGOUT', doLogout)
  yield takeLatest('SIGN_UP', signUp)
  yield takeLatest('FETCH_APP_DATA', fetchAppData)
  yield takeLatest('FETCH_USERS', fetchUsers)
  yield takeLatest('REMOVE_LOCATION', removeLocation)

  yield takeLatest('FETCH_NOTIFICATIONS', fetchNotifications)
  yield takeLatest('COUNT_USERS', countUsers)
  yield takeLatest('SEND_NOTIFICATION', sendNotification)
  yield takeLatest('FETCH_LOCATION', fetchLocation)
  yield takeLatest('SAVE_LOCATION', saveLocation)
  yield takeLatest('FETCH_LETTERS', fetchLetters)

  yield put({ type: 'SYNC_USER' })
  //yield put({ type: 'FETCH_APP_DATA' })
  //yield put({ type: 'FETCH_USERS' })
}
