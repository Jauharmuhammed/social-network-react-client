import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authModalReducer from './authModalSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    authModal: authModalReducer,
  },
})