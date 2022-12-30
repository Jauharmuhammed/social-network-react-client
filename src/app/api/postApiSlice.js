import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createPost: builder.mutation({
            query: credentials => {
                console.log(credentials);
                return ({
                    url: 'api/post/',
                    method: 'POST',
                    body: {...credentials},
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryvnCxAnKUYjNS04oA',
                    },
                })
            }
        }),
        getAllPost: builder.mutation({
            query: () => ({
                url: '/api/post/',
                method: 'GET',
            })
        }),
        getPostsByTag: builder.mutation({
            query: ({tag}) => ({
                url: `/api/tag/${tag}/`,
                method: 'GET',
            })
        }),
        getSinglePost: builder.mutation({
            query: ({id}) => ({
                url: `/api/post/${id}`,
                method: 'GET',
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/api/post/${id}`,
                method: 'DELETE',
            })
        }),
        getAllTags: builder.query({
            query: () => ({
                url: '/api/tag/',
                method: 'GET',
            })
        }),
        addComment: builder.mutation({
            query: (credentials) => ({
                url: '/api/comment/',
                method: 'POST',
                body: {...credentials},
            })
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/api/comment/${id}/`,
                method: 'DELETE',
            })
        }),
        getCommentsByPost: builder.mutation({
            query: (id) => ({
                url: `/api/post/${id}/comments/`,
                method: 'GET',
            })
        }),
        getReplies: builder.mutation({
            query: (id) => ({
                url: `/api/comment/${id}/replies/`,
                method: 'GET',
            })
        }),
        likeComment: builder.mutation({
            query: ({id, credentials}) => ({
                url: `/api/comment/like/${id}/`,
                method: 'POST',
                body: {...credentials},
            })
        }),
    })
})

export const {
    useCreatePostMutation,
    useGetAllPostMutation,
    useGetSinglePostMutation,
    useGetAllTagsQuery,
    useAddCommentMutation,
    useGetCommentsByPostMutation,
    useGetRepliesMutation,
    useGetPostsByTagMutation,
    useLikeCommentMutation,
    useDeletePostMutation,
    useDeleteCommentMutation,
} = postApiSlice