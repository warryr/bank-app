import decorator from '../util/logger';

export const depositActions = {
  ADD_DEPOSIT: 'ADD_DEPOSIT',
  SET_CLIENT_DEPOSITS: 'SET_CLIENT_DEPOSITS',
  SET_DEPOSIT_VALIDATION: 'SET_DEPOSIT_VALIDATION',
};

let reducer = (state={deposits: []}, action) => {
  switch (action.type) {
    case depositActions.ADD_DEPOSIT: {
      return {
        ...state,
        deposits: [...state.deposits, action.deposit]
      }
    }
    case depositActions.SET_CLIENT_DEPOSITS: {
      return {
        ...state,
        deposits: action.deposits
      }
    }
    case depositActions.SET_DEPOSIT_VALIDATION: {
      return {
        ...state,
        validation: action.validation,
      }
    }
    default: {
      return state;
    }
  }
};

export const depositReducer = decorator(reducer, 'Deposit', true);