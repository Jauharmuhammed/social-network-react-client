import { apiSlice } from "./apiSlice";


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        searchUsers: builder.mutation({
            query: ({q}) => ({
                url: `/api/users/search?q=${q}`,
                method: 'GET',
            })
        }),
        getMessages: builder.mutation({
            query: ({conversationName, page}) => ({
                url: `/api/messages/?conversation=${conversationName}&page=${page}`,
                method: 'GET',
            })
        }),
        getConversation: builder.mutation({
            query: ({conversationName}) => ({
                url: `/api/conversations/${conversationName}/`,
                method: 'GET',
            })
        }),
        getActiveConversations: builder.mutation({
            query: () => ({
                url: '/api/conversations/',
                method: 'GET',
            })
        }),
    })
}) 

export const {
    useSearchUsersMutation,
    useGetMessagesMutation,
    useGetConversationMutation,
    useGetActiveConversationsMutation,
} = chatApiSlice