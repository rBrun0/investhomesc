import { configureStore } from '@reduxjs/toolkit'
import filterValuesSlice from "./features/filterValues/filterValuesSlice"
import constructionFilterSlice from "./features/filterValues/constructionValues/constructionFilterSlice"
import userSlice from "./features/user/userSlices"

export const store = configureStore({
  reducer: {filterValuesSlice, constructionFilterSlice, userSlice},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch