import { createSelector } from 'reselect'
import { Map } from 'immutable'
const empty = new Map()

const selectApp = state => state.get('app')
export const isDrawerOpen = createSelector(selectApp, app => app.get('openDrawer'))
export const windowData = createSelector(selectApp, app => ({ width: app.get('width'), height: app.get('height') }))

const selectUser = state => state.get('user')
export const userData = createSelector(selectUser, data => ({
  signed: data.get('signed'), name: data.get('name'), email: data.get('email'), uid: data.get('uid'), admin: data.get('admin'),
}))
export const isUserSignedIn = createSelector(userData, data => data.signed)
export const userAdmin = createSelector(userData, data => data.admin)

const selectLogin = state => state.get('login')
export const loginData = createSelector(selectLogin, data => ({
  email: data.get('email'), password: data.get('password'),
}))

const selectLocations = state => state.get('locations')
export const locationsData = createSelector(selectLocations, data => data)

const selectEditLocation = state => state.get('editLocation')
export const editLocationData = createSelector(selectEditLocation, data => data.toJS())

const selectUsers = state => state.get('users')
export const usersData = createSelector(selectUsers, data => data)



export const notifications = state => state.get('notifications') || empty
export const filteredUsers = state => state.get('filteredUsers')
export const notificationsLoading = state => state.get('notificationsLoading')

export const snacks = state => state.get('snacks')

export const location = state => state.get('location')

export const letters = state => state.get('letters')

export const users = state => state.get('users')
