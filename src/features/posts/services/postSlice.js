import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null,
        comments: [],
    },
    reducers: {
        setPost: (state, action) => {
            state.post = action.payload
        },
        setComments: (state, action) => {
            state.comments = action.payload
        },
    }
})
export const singlePost = (state) => state.post.post
export const sinlePostComments = (state) => state.post.comments

export const { setPost, setComments } = postSlice.actions

export default postSlice.reducer