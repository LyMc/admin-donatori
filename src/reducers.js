import { fromJS } from 'immutable'

const defaultState = fromJS({
  app: {
    openDrawer: true,
  },
  user: {
    signed: null,
    name: '',
    email: '',
    uid: '',
  },
  login: {
    email: '',
    password: '',
  },
  history: {},
  notifications: {},
  locations: {
    'București': {
      '-key': {
        name: '',
        address: '',
        addressLink: '',
        program: '',
        phone: '',
        link: '',
        initialRegion: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }
      },
    }
  },
  editLocation: {
    open: false,
    key: '',
    name: '',
    address: '',
    addressLink: '',
    program: '',
    phone: '',
    link: '',
    initialRegion: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }
  },
  settings: {
    updated: false,
    birthday: {},
    sex: 0,
    city: '',
    location: '',
    weight: '',
    blood: 0,
    rh: '',
    needDonation: false,
  },
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APP/TOGGLE_DRAWER':
      return state.updateIn(['app', 'openDrawer'], openDrawer => !openDrawer)
    case 'SIGN_IN':
      return state.set('user', fromJS(action.payload)).setIn(['user', 'signed'], true)
    case 'SIGN_OUT':
      return defaultState.setIn(['user', 'signed'], false)
    case 'USER/CHANGE_NAME':
      return state.setIn(['user', 'name'], action.payload).setIn(['settings', 'updated'], true)
    case 'SETTINGS/CHANGE':
      return state.setIn(['settings', action.payload.field], fromJS(action.payload.value)).setIn(['settings', 'updated'], true)
    case 'SETTINGS/UPDATED':
      return state.setIn(['settings', 'updated'], false)
    case 'CHANGE_LOGIN_DATA':
      return state.setIn(['login', action.payload.field], action.payload.value)
    case 'RESET_LOGIN_DATA':
      return state.set('login', defaultState.get('login'))
    case 'HISTORY/SAVE':
      return state.set('history', fromJS(action.payload))
    case 'HISTORY/ADD':
      return state.updateIn(['history', action.year], history => history.push(action.payload))
    case 'HISTORY/RESET':
      return state.set('history', defaultState.get('history'))
    case 'NOTIFICATIONS/SAVE':
      return state.set('notifications', fromJS(action.payload))
    case 'NOTIFICATIONS/REMOVE':
      return state.deleteIn(['notifications', action.payload])
    case 'NOTIFICATIONS/RESET':
      return state.set('notifications', defaultState.get('notifications'))
    case 'SETTINGS/SAVE':
      return state.set('settings', fromJS(action.payload))
    case 'SETTINGS/RESET':
      return state.set('settings', defaultState.get('settings'))
    case 'LOCATIONS/SAVE':
      return state.set('locations', fromJS(action.payload))
    case 'EDIT_LOCATION/OPEN':
      return state.setIn(['editLocation', 'open'], true)
    case 'EDIT_LOCATION/CLOSE':
      return state.setIn(['editLocation', 'open'], false)
    default:
      return state
  }
}
