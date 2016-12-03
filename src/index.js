import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Router, Route, browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import App from './components/App';
import PlayField from './components/PlayField';
import './index.css';
import 'normalize.css/normalize.css';
import reducers from './reducers'

const devtool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      promiseMiddleware(),
      thunk,
    ),
    devtool,
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        path='deckmanager'
        component={App} />
      <Route
        path='playfield'
        component={PlayField} />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
