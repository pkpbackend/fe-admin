import { v3ApiNew } from "../../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Subdistrict"],
});

const masterSubdistrictApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    subdistricts: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/kecamatan",
          params: params,
        };
      },
      providesTags: [{ type: "Subdistrict", id: "LIST" }],
    }),
    subdistrict: builder.query({
      query: (id) => {
        return {
          url: `/master/kecamatan/${id}`,
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Subdistrict", id }] : [],
    }),
    createSubdistrict: builder.mutation({
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
          url: `/master/kecamatan`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Subdistrict", id: "LIST" }] : [],
    }),
    updateSubdistrict: builder.mutation({
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
          url: `/master/kecamatan/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Subdistrict", id: "LIST" }] : [],
    }),
    deleteSubdistrict: builder.mutation({
      query: (id) => {
        return {
          url: `/master/kecamatan/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Subdistrict", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSubdistrictsQuery,
  useSubdistrictQuery,
  useCreateSubdistrictMutation,
  useUpdateSubdistrictMutation,
  useDeleteSubdistrictMutation,
} = masterSubdistrictApi;
