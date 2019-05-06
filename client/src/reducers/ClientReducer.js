import decorator from '../util/logger';

export const actions = {
    SET_CLIENTS: 'SET_CLIENTS',
    ADD_CLIENT: 'ADD_CLIENT',
    ADD_CURRENT_CLIENT: 'ADD_CURRENT_CLIENT',
    DELETE_CLIENT: 'DELETE_CLIENT',
    UPDATE_CURRENT_CLIENT: 'UPDATE_CURRENT_CLIENT',
    SAVE_CHANGES: 'SAVE_CHANGES',
    SET_CLIENT_VALIDATION: 'SET_CLIENT_VALIDATION',
};

let reducer = (state={clients: [], validation: {}}, action) => {
    switch (action.type) {
        case actions.SET_CLIENTS: {
            return {
                ...state,
                clients: action.clients,
            }
        }
        case actions.ADD_CLIENT: {
            return {
                ...state,
                clients: [...state.clients, action.client]
            };
        }
        case actions.ADD_CURRENT_CLIENT: {
            return {
                ...state,
                currentClient: action.client
            }
        }
        case actions.DELETE_CLIENT: {
            return {
                ...state,
                clients: state.clients.filter(person => person.id !== action.id)
            };
        }
        case actions.UPDATE_CURRENT_CLIENT: {
            return {
                ...state,
                currentClient: {...state.currentClient, ...action.client}
            };
        }
        case actions.SAVE_CHANGES: {
            return {
                ...state,
                clients: state.clients.map(person => person.id === action.client.id ? action.client : person),
            }
        }
        case actions.SET_CLIENT_VALIDATION: {
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

export const clientReducer = decorator(reducer, 'Client', true);
