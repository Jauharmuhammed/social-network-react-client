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
    })
})

export const {
    useCreatePostMutation,
    useGetAllPostMutation,
} = postApiSlice