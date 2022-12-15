import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserDetails: builder.mutation({
            query: ({username}) => ({
                url: `/api/${username}/`,
                method: 'GET',
            })
        }),
        followUser: builder.mutation({
            query: ({username, ...credentials}) => ({
                url: `/api/${username}/follow/`,
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
}) 

export const {
    useGetUserDetailsMutation,
    useFollowUserMutation,
} = usersApiSlice