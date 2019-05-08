import decorator from '../util/logger';

export const creditActions = {
  ADD_CREDIT: 'ADD_DEPOSIT',
  UPDATE_CREDIT: 'UPDATE_DEPOSIT',
  SAVE_CREDIT_CHANGES: 'SAVE_DEPOSIT_CHANGES',
  SET_CREDIT_VALIDATION: 'SET_DEPOSIT_VALIDATION',
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