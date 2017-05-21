import { createSelector } from 'reselect'

const selectApp = state => state.get('app')
export const isDrawerOpen = createSelector(
  selectApp,
  app => app.get('openDrawer')
)

const selectUser = state => state.get('user')
export const userData = createSelector(selectUser, data => ({
  signed: data.get('signed'),
  name: data.get('name'),
  email: data.get('email'),
  uid: data.get('uid'),
}))
export const isUserSignedIn = createSelector(userData, data => data.signed)

const selectLogin = state => state.get('login')
export const loginData = createSelector(selectLogin, data => ({
  email: data.get('email'),
  password: data.get('password'),
}))

const selectLocations = state => state.get('locations')
export const locationsData = createSelector(selectLocations, data => data)

const selectEditLocation = state => state.get('editLocation')
export const editLocationData = createSelector(selectEditLocation, data => data.toJS())

const selectUsers = state => state.get('users')
export const usersData = createSelector(selectUsers, data => data)
