import decorator from '../util/logger';

export const creditActions = {
  ADD_CREDIT: 'ADD_CREDIT',
  SET_CREDIT_VALIDATION: 'SET_CREDIT_VALIDATION',
};

let reducer = (state={}, action) => {
  switch (action.type) {
    case creditActions.ADD_CREDIT: {
      return
    }
    default: {
      return state;
    }
  }
};

export const creditReducer = decorator(reducer, 'Deposit', true);