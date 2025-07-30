import { v3ApiNew } from "../../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Province"],
});

const masterProvinceApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    provinces: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/provinsi",
          params: params,
        };
      },
      providesTags: [{ type: "Province", id: "LIST" }],
    }),
    province: builder.query({
      query: (id) => {
        return {
          url: `/master/provinsi/${id}`,
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Province", id }] : [],
    }),
    createProvince: builder.mutation({
      query: (values) => {
        const formData = new FormData();
        for (const key in values) {
          if (Object.hasOwnProperty.call(values, key)) {
            const value = values[key];
            formData.append(key, value !== null ? value : "");
          }
        }
        return {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `/master/provinsi`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Province", id: "LIST" }] : [],
    }),
    updateProvince: builder.mutation({
      query: ({ id, ...values }) => {
        const formData = new FormData();
        for (const key in values) {
          if (Object.hasOwnProperty.call(values, key)) {
            const value = values[key];
            formData.append(key, value !== null ? value : "");
          }
        }
        return {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `/master/provinsi/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Province", id: "LIST" }] : [],
    }),
    deleteProvince: builder.mutation({
      query: (id) => {
        return {
          url: `/master/provinsi/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Province", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useProvincesQuery,
  useProvinceQuery,
  useCreateProvinceMutation,
  useUpdateProvinceMutation,
  useDeleteProvinceMutation,
} = masterProvinceApi;
