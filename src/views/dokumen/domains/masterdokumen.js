import { v3ApiNew } from "../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Dokumen"],
});

const dokumenDokumenApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    dokumens: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/masterdokumen",
          params: params,
        };
      },
      // transformResponse: (response) => {
      //   let res = {
      //     ...response?.data,
      //     data: response?.data?.rows
      //   }
      //   return res;
      // },
      providesTags: [{ type: "Dokumen", id: "LIST" }],
    }),
    dokumen: builder.query({
      query: (id) => {
        return {
          url: `/master/masterdokumen/${id}`,
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Dokumen", id }] : [],
    }),
    createDokumen: builder.mutation({
      query: (body) => {
        return {
          url: `/master/masterdokumen`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Dokumen", id: "LIST" }] : [],
    }),
    updateDokumen: builder.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `/master/masterdokumen/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Dokumen", id: "LIST" }] : [],
    }),
    deleteDokumen: builder.mutation({
      query: (id) => {
        return {
          url: `/master/masterdokumen/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Dokumen", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useDokumensQuery,
  useDokumenQuery,
  useCreateDokumenMutation,
  useUpdateDokumenMutation,
  useDeleteDokumenMutation,
} = dokumenDokumenApi;
