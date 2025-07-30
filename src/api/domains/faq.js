import { v3ApiNew } from "../ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["FAQ"],
});

const faqApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    faq: builder.query({
      query: (arg) => {
        return {
          url: "/portalperumahan/faq",
          params: {
            page: 1,
            pageSize: 9999,
            ...arg,
          },
        };
      },
      providesTags: () => [{ type: "FAQ", id: "LIST" }],
    }),
    faqById: builder.query({
      query: (arg) => {
        return {
          url: `/portalperumahan/faq/${arg?.id || ""}`,
        };
      },
    }),
    submitFaq: builder.mutation({
      query: (args) => {
        return {
          url: `/portalperumahan/faq/${args?.id || ""}`,
          method: args?.id ? "PUT" : "POST",
          body: {
            ...args,
            id: undefined,
          },
        };
      },
      invalidatesTags: () => [{ type: "FAQ", id: "LIST" }],
    }),
    deleteFaq: builder.mutation({
      query: (args) => {
        return {
          url: `/portalperumahan/faq/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: () => [{ type: "FAQ", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useFaqQuery,
  useSubmitFaqMutation,
  useDeleteFaqMutation,
  useFaqByIdQuery,
} = faqApi;
