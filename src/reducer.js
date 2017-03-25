const appReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return state = 0;
  case 'REGISTER':
    return state = 1;
  case 'LOGGED_IN':
    return state = 2;
  default:
    return state
  }
};

export default appReducer;