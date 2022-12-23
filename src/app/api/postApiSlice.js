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
        getSinglePost: builder.mutation({
            query: ({id}) => ({
                url: `/api/post/${id}`,
                method: 'GET',
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
        getCommentsByPost: builder.mutation({
            query: (id) => ({
                url: `/api/post/${id}/comments/`,
                method: 'GET',
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
} = postApiSlice