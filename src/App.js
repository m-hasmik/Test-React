import React from 'react'
import { hot } from 'react-hot-loader'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { I18nextProvider } from 'react-i18next'
import i18n from '~/helpers/intl'

import reducer from './reducers'
import history from './history'
import rootSaga from './rootSaga'

import AppWrapper from './components/common/Body'
import { PrivateRoute } from './components/PrivateRoute'
import { getDomainPath } from '~/helpers/url'
import HomePage from './routes/Search'
import Menus from './routes/Menus'
import Planning from './routes/Planning'
import CentralMenus from './routes/CentralMenu'
import RecipeDetail from './routes/Recipe'
import Print from './routes/Print'
import Login from './routes/Login'
import NoMatch from './routes/NoMatch'

const sagaMiddleware = createSagaMiddleware()

// return an implementation func when non dev env, to avoid disrupting the compose not nullable object
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : i => i

const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    devTools
  )
)

sagaMiddleware.run(rootSaga)

const App = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <AppWrapper>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path={`${getDomainPath()}/`}
              component={HomePage}
            />
            <PrivateRoute
              exact
              path={`${getDomainPath()}/recipes/:id`}
              component={RecipeDetail}
            />
            <PrivateRoute
              exact
              path={`${getDomainPath()}/menus`}
              component={Menus}
            />
            <PrivateRoute
              exact
              path={`${getDomainPath()}/centralMenu`}
              component={CentralMenus}
            />
            <PrivateRoute
              exact
              path={`${getDomainPath()}/menus/:id/planning`}
              component={Planning}
            />
            <PrivateRoute
              exact
              path={`${getDomainPath()}/:type/:id/print`}
              component={Print}
            />
            <Route path={`${getDomainPath()}/login`} component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AppWrapper>
    </I18nextProvider>
  </Provider>
)

export default hot(module)(App)
