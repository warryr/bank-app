import decorator from '../util/logger';

export const entriesActions = {
  SET_ENTRIES: 'SET_ENTRIES',
};

let reducer = (state={entries: {}}, action) => {
  switch (action.type) {
    case entriesActions.SET_ENTRIES: {
      return {
        ...state,
        entries: action.entries
      }
    }
    default: {
      return state;
    }
  }
};

export const entriesReducer = decorator(reducer, 'Entries', true);