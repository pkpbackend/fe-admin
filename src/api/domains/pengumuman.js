import { v3ApiNew } from "../ApiCallV3New";
const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Pengumuman"],
});
const portalApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    Pengumuman: builder.query({
      query: (arg) => {
        return {
          url: "/portalperumahan/pengumuman",
          params: {
            ...arg,
          },
        };
      },
      providesTags: [{ type: "Pengumuman", id: "LIST" }],
    }),
    PengumumanById: builder.query({
      query: (arg) => {
        return {
          url: `/portalperumahan/pengumuman/${arg?.id || ""}`,
        };
      },
    }),
    submitPengumuman: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/portalperumahan/pengumuman${id ? `/${id}` : ""}`,
          method: id ? "PUT" : "POST",
          body: data,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Pengumuman", id: "LIST" }] : [],
    }),
    deletePengumuman: builder.mutation({
      query: (id) => {
        return {
          url: `/portalperumahan/pengumuman/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Pengumuman", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubmitPengumumanMutation,
  useDeletePengumumanMutation,
  usePengumumanByIdQuery,
  usePengumumanQuery,
} = portalApi;
