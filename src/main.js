import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter.jsx';
 
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
};

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });



document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('mount')
  );
});