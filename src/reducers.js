import { fromJS } from 'immutable'

const defaultState = fromJS({
  app: {
    openDrawer: true,
    width: 0,
    height: 0,
  },
  user: {
    signed: null,
    name: '',
    email: '',
    uid: '',
    admin: '',
  },
  login: {
    email: '',
    password: '',
  },
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
    city: '',
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
  notifications: {},
  filteredUsers: 0,
  notificationsLoading: false,
  snacks: [],
  location: {
    name: '',
    city: '',
    address: '',
    phone: '',
    website: '',
    addressLink:'',
    latitude: 0,
    longitude: 0,
    hours: ';;;;;;',
  },
  letters: {},
  users: {},
})

export default (state = defaultState, action) => {
  const { payload } = action
  switch (action.type) {
    case 'APP/TOGGLE_DRAWER':
      return state.updateIn(['app', 'openDrawer'], openDrawer => action.payload === null ? !openDrawer : action.payload)
    case 'APP/RESIZE_WINDOW':
      return state.setIn(['app', 'width'], action.payload.width).setIn(['app', 'height'], action.payload.height)
    case 'SIGN_IN':
      return state.set('user', fromJS({...action.payload, signed: true }))
    case 'SIGN_OUT':
      return state.setIn(['user', 'signed'], false)
    case 'CHANGE_LOGIN_DATA':
      return state.setIn(['login', action.payload.field], action.payload.value)
    case 'RESET_LOGIN_DATA':
      return state.set('login', defaultState.get('login'))
    case 'LOCATIONS/SAVE':
      return state.set('locations', fromJS(action.payload))
    case 'EDIT_LOCATION/CHANGE':
      return state.setIn(['editLocation', action.payload.field], action.payload.value)
    case 'EDIT_LOCATION/CHANGE_IN':
      return state.setIn(['editLocation', action.payload.field, action.payload.subfield], action.payload.value)
    case 'EDIT_LOCATION/EDIT':
      return state.set('editLocation', state.getIn(['locations', action.payload.city, action.payload.key])).setIn(['editLocation', 'city'], action.payload.city).setIn(['editLocation', 'key'], action.payload.key).setIn(['editLocation', 'open'], true)
    case 'EDIT_LOCATION/RESET':
      return state.set('editLocation', defaultState.get('editLocation'))

    case 'NOTIFICATIONS/SAVE':
      return state.set('notifications', fromJS(payload))
    case 'FILTERED_USERS/SET':
      return state.set('filteredUsers', payload)
    case 'NOTIFICATIONS/LOADING':
      return state.set('notificationsLoading', true)
    case 'NOTIFICATIONS/LOADED':
      return state.set('notificationsLoading', false)
    case 'SNACKS/ADD':
      return state.update('snacks', snacks => snacks.push(action.payload))
    case 'SNACKS/REMOVE':
      return state.update('snacks', snacks => snacks.shift())
    case 'LOCATION/SET':
      return state.set('location', fromJS(payload))
    case 'LOCATION/CHANGE':
      return state.setIn(['location', payload.field], payload.value)
    case 'LETTERS/SET':
      return state.set('letters', fromJS(payload))
    case 'USERS/SET':
      return state.set('users', fromJS(payload))
    default:
      return state
  }
}
