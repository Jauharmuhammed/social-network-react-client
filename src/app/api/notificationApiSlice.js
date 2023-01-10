import { apiSlice } from "./apiSlice";


export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.mutation({
            query: () => ({
                url: `/api/notifications/`,
                method: 'GET',
            })
        }),
    })
}) 

export const {
    useGetNotificationsMutation,
} = notificationApiSlice