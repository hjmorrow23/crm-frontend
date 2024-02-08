import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { user } from './slices/user'
import { recipe } from './slices/recipe'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, user)
const reducer = combineReducers({
  user: persistedUserReducer,
  recipe
})
export const store = configureStore({
  reducer,
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer,
    preloadedState
  })
}
export const persistor = persistStore(store);