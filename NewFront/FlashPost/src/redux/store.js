import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import formDataReducer from './formDataSlice'


export const store = configureStore({
  reducer: {
        user: userReducer,
        blog: formDataReducer,
  },
})
