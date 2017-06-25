import React from 'react'
import ReactDOM from 'react-dom'

import AppScreen from './containers/AppScreen'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import muiTheme from './muiTheme'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
injectTapEventPlugin()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <AppScreen/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
