import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import appReducer from './reducer';
import App from './containers/App';
 
let reduxStore = createStore(appReducer);

reduxStore.dispatch({ type: 'LOG_IN' });

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
    document.getElementById('mount')
  );
});