import { apiSlice } from "./apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        reportPost: builder.mutation({
            query: credentials => ({
                url: "api/report/",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useReportPostMutation } = reportApiSlice;
