import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserDetails: builder.mutation({
            query: ({username}) => ({
                url: `/api/${username}/`,
                method: 'GET',
            })
        }),
        updateUserDetails: builder.mutation({
            query: ({credentials}) => ({
                url: `/api/profile/update/`,
                method: 'POST',
                body: {...credentials}
            })
        }),
        followUser: builder.mutation({
            query: ({username, ...credentials}) => ({
                url: `/api/${username}/follow/`,
                method: 'POST',
                body: { ...credentials }
            })
        }),
        postsByUser: builder.mutation({
            query: ({username}) => ({
                url: `/api/post/user/${username}/`,
                method: 'GET'
            })
        }),
        collectionsByUser: builder.query({
            query: ({username}) => ({
                url: `/api/collections/${username}/`,
                method: 'GET'
            })
        }),
        postsByCollection: builder.mutation({
            query: ({username, slug}) => ({
                url: `/api/collection/${username}/${slug}/`,
                method: 'GET'
            })
        }),
    })
}) 

export const {
    useGetUserDetailsMutation,
    useFollowUserMutation,
    usePostsByUserMutation,
    useCollectionsByUserQuery,
    usePostsByCollectionMutation,
    useUpdateUserDetailsMutation,
} = usersApiSlice