import decorator from '../util/logger';

//TODO: validation for login and password

export const actions = {
  SAVE_TOKEN: 'SAVE_TOKEN',
  LOG_OUT: 'LOG_OUT',
  SET_USER_VALIDATION: 'SET_USER_VALIDATION',
  SET_SERVER_ERROR: 'SET_SERVER_ERROR',
};

let reducer = (state={currentToken: ''}, action) => {
  switch (action.type) {
    case actions.SAVE_TOKEN: {
      return {
        ...state,
        currentToken: action.token,
      }
    }
    case actions.LOG_OUT: {
      return {
        ...state,
        currentToken: '',
      }
    }
    case actions.SET_USER_VALIDATION: {
      return
    }
    case actions.SET_SERVER_ERROR: {
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


