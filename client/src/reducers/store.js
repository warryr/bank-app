import { createStore } from 'redux';
import { clientReducer } from './ClientReducer';

const store = createStore(clientReducer);

export default store;