import { apiSlice } from "./apiSlice";


export const collectionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveToCollections: builder.mutation({
            query: ({post, slug, credentials }) => ({
                url: `/api/save/${post}/${slug}/`,
                method: 'POST',
                body: {...credentials},
            })
        }),
        removeFromCollection: builder.mutation({
            query: ({post, slug, credentials }) => ({
                url: `/api/remove/${post}/${slug}/`,
                method: 'POST',
                body: {...credentials},
            })
        }),
    })
}) 

export const {
    useSaveToCollectionsMutation,
    useRemoveFromCollectionMutation,
} = collectionApiSlice