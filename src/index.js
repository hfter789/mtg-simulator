import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import App from './components/App';
import './index.css';
import 'normalize.css/normalize.css';
import reducers from './reducers'

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

const store = createStore(
  reducers,
  applyMiddleware(
    promiseMiddleware
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
