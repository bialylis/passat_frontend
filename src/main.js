import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import appReducer from './reducer';
import App from './App';
 
let reduxStore = createStore(appReducer);

reduxStore.subscribe(() =>
  console.log(reduxStore.getState())
);

reduxStore.dispatch({ type: 'LOG_IN' });

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
    document.getElementById('mount')
  );
});