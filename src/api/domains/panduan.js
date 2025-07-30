import { v3ApiNew } from "../ApiCallV3New";
import apiHook from "../hooks";
const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Panduan"],
});

const panduanApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    panduan: builder.query({
      query: ({ sorted, filtered, page, pageSize }) => {
        const params = { page, pageSize };
        params.filtered = JSON.stringify(filtered || []);
        params.sorted = JSON.stringify(sorted || []);
        return {
          url: "/portalperumahan/peraturan",
          params: params,
        };
      },
      providesTags: [{ type: "Panduan", id: "LIST" }],
    }),
    panduanById: builder.query({
      query: (arg) => {
        return {
          url: `/portalperumahan/peraturan/${arg?.id || ""}`,
        };
      },
    }),
    submitPanduan: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/portalperumahan/peraturan${id ? `/${id}` : ""}`,
          method: id ? "PUT" : "POST",
          body: data,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Panduan", id: "LIST" }] : [],
    }),
    deletePanduan: builder.mutation({
      query: (args) => {
        return {
          url: `/portalperumahan/peraturan/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Panduan", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const usePanduan = () => apiHook(panduanApi.usePanduanQuery);

export const {
  useSubmitPanduanMutation,
  useDeletePanduanMutation,
  usePanduanByIdQuery,
  usePanduanQuery,
} = panduanApi;
