import decorator from '../util/logger';

export const depositActions = {
  ADD_DEPOSIT: 'ADD_DEPOSIT',
  SET_DEPOSIT_VALIDATION: 'SET_DEPOSIT_VALIDATION',
  SET_CLIENT_DEPOSITS: 'SET_CLIENT_DEPOSITS',
};

let reducer = (state={deposits: [], validation: {}}, action) => {
  switch (action.type) {
    case depositActions.ADD_DEPOSIT: {
      return {
        ...state,
        deposits: [...state.deposits, action.deposit]
      }
    }
    case depositActions.SET_DEPOSIT_VALIDATION: {
      return {
        ...state,
        validation: action.validation,
      }
    }
    case depositActions.SET_CLIENT_DEPOSITS: {
      return {
        ...state,
        deposits: action.deposits
      }
    }
    default: {
      return state;
    }
  }
};

export const depositReducer = decorator(reducer, 'Deposit', true);