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
        createCollection: builder.mutation({
            query: ({credentials}) => ({
                url: `/api/collection/create`,
                method: 'POST',
                body: {...credentials},
            })
        }),
        deleteCollection: builder.mutation({
            query: (id) => ({
                url: `/api/collection/${id}`,
                method: 'DELETE',
            })
        }),
    })
}) 

export const {
    useSaveToCollectionsMutation,
    useRemoveFromCollectionMutation,
    useCreateCollectionMutation,
    useDeleteCollectionMutation,
} = collectionApiSlice