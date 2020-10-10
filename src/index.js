import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import './index.css';
import App from './App.js';
import {rootReducer} from './reducers/rootReducer.js';

const store = createStore(rootReducer, applyMiddleware(thunk,logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

