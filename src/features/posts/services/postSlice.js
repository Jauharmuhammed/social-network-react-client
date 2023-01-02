import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: null,
        comments: [],
    },
    reducers: {
        setPost: (state, action) => {
            state.post = action.payload;
        },
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComments: (state, action) => {
            state.comments = [action.payload, ...state.comments];
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
        },
        increasePostCommentCount: (state) => {
            state.post.comments_count++;
        },
        decreasePostCommentCount: (state) => {
            state.post.comments_count--;
        },
    },
});
export const singlePost = (state) => state.post.post;
export const singlePostComments = (state) => state.post.comments;

export const {
    setPost,
    setComments,
    addComments,
    removeComment,
    increasePostCommentCount,
    decreasePostCommentCount,
} = postSlice.actions;

export default postSlice.reducer;
