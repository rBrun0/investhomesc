import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterValuesSlice from "./features/filterValues/filterValuesSlice"
import constructionFilterSlice from "./features/filterValues/constructionValues/constructionFilterSlice"
import userSlice from "./features/user/userSlices"

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './features/api/apiSlice';

type RootReducerType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  filterValuesSlice,
  constructionFilterSlice,
  userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["filterValuesSlice", "constructionFilterSlice", "userSlice"]
};

const persistedReducer = persistReducer<RootReducerType>(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware), 
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch