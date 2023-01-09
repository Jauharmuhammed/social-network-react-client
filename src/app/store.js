import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "features/auth/services/authSlice";
import authModalReducer from "features/auth/services/authModalSlice";
import userReducer from "features/users/services/userSlice";
import { postModalReducer, postReducer } from "features/posts";
import { collectionModalReducer, collectionReducer } from "features/collection";
import { chatModalReducer, chatReducer } from "features/chat";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        authModal: authModalReducer,
        user: userReducer,
        post: postReducer,
        collection: collectionReducer,
        collectionModal: collectionModalReducer,
        chat: chatReducer,
        chatModal: chatModalReducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools:true
})

