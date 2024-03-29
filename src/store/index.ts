import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { user } from './slices/user'
import { lead } from './slices/lead'
import { interaction } from './slices/interaction'
import { payment } from './slices/payment'
import storage from 'redux-persist/lib/storage';
import { 
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, user)
const reducer = combineReducers({
  user: persistedUserReducer,
  lead,
  interaction,
  payment
})
export const store = configureStore({
  reducer,
})

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);