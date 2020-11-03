import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './redux/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer,compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
))

firebase.initializeApp({
  apiKey: "AIzaSyCktlM_2XW7mxI7bI6MtL-b27f14_5jri4",
  authDomain: "react-crm-1a868.firebaseapp.com",
  databaseURL: "https://react-crm-1a868.firebaseio.com",
  projectId: "react-crm-1a868",
  storageBucket: "react-crm-1a868.appspot.com",
  messagingSenderId: "608606695450",
  appId: "1:608606695450:web:9277cd64b580ca581461a3"
})

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
