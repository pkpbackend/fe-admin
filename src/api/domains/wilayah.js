import { v3ApiNew } from "../ApiCallV3New";
import apiHook from "../hooks";

const wilayahApi = v3ApiNew.injectEndpoints({
  endpoints: (builder) => ({
    provinsi: builder.query({
      query: (arg) => {
        return {
          url: "/master/wilayah/provinsi",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
    }),
    provinsiById: builder.query({
      query: (arg) => {
        return {
          url: `/master/provinsi/${arg?.id || ""}`,
        };
      },
    }),
    submitProvinsi: builder.mutation({
      query: (args) => {
        return {
          url: `/master/provinsi/${args?.id || ""}`,
          method: args?.id ? "PUT" : "POST",
          body: {
            ...args,
            id: undefined,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Provinsi", id }],
    }),
    deleteProvinsi: builder.mutation({
      query: (args) => {
        return {
          url: `/master/provinsi/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Provinsi", id }],
    }),

    // kabupaten
    kabupaten: builder.query({
      query: (arg) => {
        return {
          url: "/master/wilayah/city",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: [],
    }),
    kabupatenById: builder.query({
      query: (arg) => {
        return {
          url: `/master/wilayah/city/${arg?.id || ""}`,
        };
      },
    }),
    submitKabupaten: builder.mutation({
      query: (args) => {
        return {
          url: `/master/wilayah/city/${args?.id || ""}`,
          method: args?.id ? "PUT" : "POST",
          body: {
            ...args,
            id: undefined,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Kabupaten", id }],
    }),
    deleteKabupaten: builder.mutation({
      query: (args) => {
        return {
          url: `/master/wilayah/city/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Kabupaten", id }],
    }),

    // kecamatan
    kecamatan: builder.query({
      query: (arg) => {
        return {
          url: "/master/wilayah/kecamatan",
          params: {
            ...arg,
          },
        };
      },
      // transformResponse: (response) => response,
      invalidatesTags: [],
    }),
    kecamatanById: builder.query({
      query: (arg) => {
        return {
          url: `/master/wilayah/kecamatan${arg?.id || ""}`,
        };
      },
    }),
    submitKecamatan: builder.mutation({
      query: (args) => {
        return {
          url: `/master/wilayah/kecamatan/${args?.id || ""}`,
          method: args?.id ? "PUT" : "POST",
          body: {
            ...args,
            id: undefined,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Kecamatan", id }],
    }),
    deleteKecamatan: builder.mutation({
      query: (args) => {
        return {
          url: `/master/wilayah/kecamatan/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Kecamatan", id }],
    }),

    // desa
    desa: builder.query({
      query: (arg) => {
        return {
          url: "/master/desa",
          params: {
            ...arg,
          },
        };
      },
      // transformResponse: (response) => response,
      invalidatesTags: [],
    }),
    desaById: builder.query({
      query: (arg) => {
        return {
          url: `/master/desa/${arg?.id || ""}`,
        };
      },
    }),
    submitDesa: builder.mutation({
      query: (args) => {
        return {
          url: `/master/desa/${args?.id || ""}`,
          method: args?.id ? "PUT" : "POST",
          body: {
            ...args,
            id: undefined,
          },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Desa", id }],
    }),
    deleteDesa: builder.mutation({
      query: (args) => {
        return {
          url: `/master/desa/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Desa", id }],
    }),
  }),
  overrideExisting: true,
});

export const useProvinsi = () => apiHook(wilayahApi.useProvinsiQuery);

export const useKabupaten = () => apiHook(wilayahApi.useKabupatenQuery);

export const useKecamatan = () => apiHook(wilayahApi.useKecamatanQuery);

export const useDesa = () => apiHook(wilayahApi.useDesaQuery);
export const {
  useSubmitProvinsiMutation,
  useDeleteProvinsiMutation,
  useProvinsiByIdQuery,
  useProvinsiQuery,

  useSubmitKabupatenMutation,
  useDeleteKabupatenMutation,
  useKabupatenByIdQuery,
  useKabupatenQuery,

  useSubmitKecamatanMutation,
  useDeleteKecamatanMutation,
  useKecamatanByIdQuery,

  useSubmitDesaMutation,
  useDeleteDesaMutation,
  useDesaByIdQuery,
} = wilayahApi;
