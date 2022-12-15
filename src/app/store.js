import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "features/auth/services/authSlice";
import authModalReducer from "features/auth/services/authModalSlice";
import userReducer from "features/users/services/userSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        authModal: authModalReducer,
        user: userReducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools:true
})

