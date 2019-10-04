import decorator from '../util/logger'

export const clientActions = {
  SET_CLIENTS: 'SET_CLIENTS',
  ADD_CLIENT: 'ADD_CLIENT',
  SET_CURRENT_CLIENT: 'SET_CURRENT_CLIENT',
  DELETE_CLIENT: 'DELETE_CLIENT',
  UPDATE_CURRENT_CLIENT: 'UPDATE_CLIENT',
  SAVE_CLIENT_CHANGES: 'SAVE_CLIENT_CHANGES',
  SET_CLIENT_VALIDATION: 'SET_CLIENT_VALIDATION',
}

let reducer = (state = { clients: [], validation: {} }, action) => {
  switch (action.type) {
    case clientActions.SET_CLIENTS: {
      return {
        ...state,
        clients: action.clients,
      }
    }
    case clientActions.ADD_CLIENT: {
      return {
        ...state,
        clients: [...state.clients, action.client],
      }
    }
    case clientActions.SET_CURRENT_CLIENT: {
      return {
        ...state,
        currentClient: action.client,
      }
    }
    case clientActions.DELETE_CLIENT: {
      return {
        ...state,
        clients: state.clients.filter((person) => person.id !== action.id),
      }
    }
    case clientActions.UPDATE_CURRENT_CLIENT: {
      return {
        ...state,
        currentClient: { ...state.currentClient, ...action.client },
      }
    }
    case clientActions.SAVE_CLIENT_CHANGES: {
      return {
        ...state,
        clients: state.clients.map((person) =>
          person.id === action.client.id ? action.client : person,
        ),
      }
    }
    case clientActions.SET_CLIENT_VALIDATION: {
      return {
        ...state,
        validation: action.validation,
      }
    }
    default: {
      return state
    }
  }
}

export const clientReducer = decorator(reducer, 'Client', true)
