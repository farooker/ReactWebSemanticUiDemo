import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

// redux  store 
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import CartReducer from './Reducer/ReducerCart';
import { strict } from 'assert';


const store = createStore(CartReducer);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


