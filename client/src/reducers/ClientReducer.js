import decorator from '../util/logger';

export const actions = {
    SET_CLIENTS: 'SET_CLIENTS',
    ADD_CLIENT: 'ADD_CLIENT',
    DELETE_CLIENT: 'DELETE_CLIENT',
    UPDATE_CLIENT: 'UPDATE_CLIENT',
    SAVE_CHANGES: 'SAVE_CHANGES',
};

let reducer = (state={clients: []}, action) => {
    switch (action.type) {
        case actions.SET_CLIENTS: {
            return {
                ...state,
                clients: action.clients,
                currentProcessingId: null
            }
        }
        case actions.ADD_CLIENT: {
            return {
                ...state,
                clients: [...state.clients, action.client]
            };
        }
        case actions.DELETE_CLIENT: {
            return {
                ...state,
                clients: state.clients.filter(person => person.id !== action.id)
            };
        }
        case actions.UPDATE_CLIENT: {
            return {
                ...state,
                currentProcessingId: action.id
            };
        }
        case actions.SAVE_CHANGES: {
            return {
                ...state,
                clients: state.clients.map(person => person.id === action.client.id ? action.client : person),
                currentProcessingId: null
            }
        }
        default: {
            return state;
        }
    }
};

export const clientReducer = decorator(reducer, 'Client', true);
