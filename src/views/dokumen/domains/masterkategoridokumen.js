import { v3ApiNew } from "../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["KategoriDokumen"],
});

const masterKategoriDokumenApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    kategoriDokumens: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/masterkategoridokumen",
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
      providesTags: [{ type: "KategoriDokumen", id: "LIST" }],
    }),
    kategoriDokumen: builder.query({
      query: (id) => {
        return {
          url: `/master/masterkategoridokumen/${id}`,
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "KategoriDokumen", id }] : [],
    }),
    createKategoriDokumen: builder.mutation({
      query: (body) => {
        return {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `/master/masterkategoridokumen`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "KategoriDokumen", id: "LIST" }] : [],
    }),
    updateKategoriDokumen: builder.mutation({
      query: ({ id, ...body }) => {
        return {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `/master/masterkategoridokumen/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "KategoriDokumen", id: "LIST" }] : [],
    }),
    deleteKategoriDokumen: builder.mutation({
      query: (id) => {
        return {
          url: `/master/masterkategoridokumen/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "KategoriDokumen", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useKategoriDokumensQuery,
  useKategoriDokumenQuery,
  useCreateKategoriDokumenMutation,
  useUpdateKategoriDokumenMutation,
  useDeleteKategoriDokumenMutation,
} = masterKategoriDokumenApi;
