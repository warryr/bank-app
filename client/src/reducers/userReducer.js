import decorator from '../util/logger';

//TODO: validation for login and password

export const userActions = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
  SET_USER_VALIDATION: 'SET_USER_VALIDATION',
  SET_SERVER_ERROR: 'SET_SERVER_ERROR',
};

let reducer = (state={currentToken: ''}, action) => {
  switch (action.type) {
    case userActions.LOG_IN: {
      return {
        ...state,
        currentUser: action.username,
        currentToken: action.token,
      }
    }
    case userActions.LOG_OUT: {
      return {
        ...state,
        currentUser: '',
        currentToken: '',
      }
    }
    case userActions.SET_USER_VALIDATION: {
      return
    }
    case userActions.SET_SERVER_ERROR: {
      return {
        serverError: action.error,
      }
    }
    default: {
      return state;
    }
  }
};

export const userReducer = decorator(reducer, 'User', true);


