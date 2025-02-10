import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterValuesSlice from "./features/filterValues/filterValuesSlice"
import constructionFilterSlice from "./features/filterValues/constructionValues/constructionFilterSlice"
import userSlice from "./features/user/userSlices"

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  filterValuesSlice,
  constructionFilterSlice,
  userSlice,
})

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch