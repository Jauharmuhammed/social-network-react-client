import { apiSlice } from "./apiSlice";


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.mutation({
            query: () => ({
                url: '/api/admin/users/',
                method: 'GET',
            })
        }),
        blockUser: builder.mutation({
            query: ({id, ...credentials}) => ({
                url: `/api/admin/users/${id}/`,
                method: 'PUT',
                body: { ...credentials }
            })
        }),
    })
}) 

export const {
    useGetUsersMutation,
    useBlockUserMutation,
} = adminApiSlice