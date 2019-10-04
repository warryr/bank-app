import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { clientReducer } from 'src/modules/Client/clientReducer'
import { depositReducer } from 'src/modules/Deposit/depositReducer'
import { creditReducer } from 'src/modules/Credit/creditReducer'
import { userReducer } from 'src/modules/Login/userReducer'
import { entriesReducer } from 'src/modules/Entry/entriesReducer'

const reducer = combineReducers({
  client: clientReducer,
  deposit: depositReducer,
  credit: creditReducer,
  user: userReducer,
  entries: entriesReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
