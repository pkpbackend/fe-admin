import { v3ApiNew } from "../ApiCallV3New";
const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["KomponenPengajuan"],
});
const komponenPengajuanApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    komponenPengajuan: builder.query({
      query: (arg) => {
        return {
          url: "/master/komponenpengajuan",
          params: {
            ...arg,
          },
        };
      },
      providesTags: [{ type: "KomponenPengajuan", id: "LIST" }],
    }),
    submitKomponenPengajuan: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/master/komponenpengajuan${id ? `/${id}` : ""}`,
          method: id ? "PUT" : "POST",
          body: data,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "KomponenPengajuan", id: "LIST" }] : [],
    }),
    deleteKomponenPengajuan: builder.mutation({
      query: (id) => {
        return {
          url: `/master/komponenpengajuan/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "KomponenPengajuan", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubmitKomponenPengajuanMutation,
  useDeleteKomponenPengajuanMutation,
  useKomponenPengajuanQuery,
} = komponenPengajuanApi;
