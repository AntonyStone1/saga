import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMidelware = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const configureStor = (preloadedState) =>
  createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMidelware)),
  )

const store = configureStor({})

sagaMidelware.run(rootSaga)

export default store
