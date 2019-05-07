import decorator from '../util/logger';

export const actions = {
  ADD_DEPOSIT: 'ADD_DEPOSIT',
  UPDATE_DEPOSIT: 'UPDATE_DEPOSIT',
  SAVE_DEPOSIT_CHANGES: 'SAVE_DEPOSIT_CHANGES',
  SET_DEPOSIT_VALIDATION: 'SET_DEPOSIT_VALIDATION',
};

let reducer = (state={}, action) => {
  switch (action.type) {
    case actions.ADD_DEPOSIT: {
      return
    }
    default: {
      return state;
    }
  }
};

export const depositReducer = decorator(reducer, 'Deposit', true);