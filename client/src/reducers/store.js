import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { clientReducer } from './clientReducer';
import { depositReducer } from './depositReducer';
import { creditReducer } from './creditReducer';
import { userReducer } from './userReducer';
import { entriesReducer } from './entriesReducer';

const reducer = combineReducers({
  client: clientReducer,
  deposit: depositReducer,
  credit: creditReducer,
  user: userReducer,
  entries: entriesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };