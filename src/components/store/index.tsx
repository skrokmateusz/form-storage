import { configureStore } from '@reduxjs/toolkit'

import dataSlice from './data'

const store = configureStore({
	reducer:  dataSlice.reducer,
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
