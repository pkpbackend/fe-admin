import { v3ApiNew } from "../../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Village"],
});

const masterVillageApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    villages: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/desa",
          params: params,
        };
      },
      providesTags: [{ type: "Village", id: "LIST" }],
    }),
    village: builder.query({
      query: (id) => {
        return {
          url: `/master/desa/${id}`,
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Village", id }] : [],
    }),
    createVillage: builder.mutation({
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
          url: `/master/desa`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Village", id: "LIST" }] : [],
    }),
    updateVillage: builder.mutation({
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
          url: `/master/desa/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Village", id: "LIST" }] : [],
    }),
    deleteVillage: builder.mutation({
      query: (id) => {
        return {
          url: `/master/desa/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Village", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useVillagesQuery,
  useVillageQuery,
  useCreateVillageMutation,
  useUpdateVillageMutation,
  useDeleteVillageMutation,
} = masterVillageApi;
