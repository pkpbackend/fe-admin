/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Developer"],
});
const developerManagementApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    developers: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/pengembang",
          params: params,
        };
      },
      providesTags: (result) => {
        return [{ type: "Developer", id: "LIST" }];
      },
    }),
    developer: builder.query({
      query: (id) => {
        return {
          url: `/master/pengembang/${id}`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Developer", id }],
    }),
    createDeveloper: builder.mutation({
      query: (data) => {
        return {
          url: "/master/pengembang",
          method: "POST",
          body: data,
        };
      },
      transformErrorResponse: (error) =>
        error?.data?.message ?? "Internal server error",
      invalidatesTags: [{ type: "Developer", id: "LIST" }],
    }),
    updateDeveloper: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/master/pengembang/${id}`,
          method: "PUT",
          body: data,
        };
      },
      transformErrorResponse: (response) =>
        response?.data?.message ?? "Internal server error",
      invalidatesTags: [{ type: "Developer", id: "LIST" }],
    }),
    validationNpwpDeveloper: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/master/pengembang/${id}/validasi-npwp`,
          method: "PUT",
          body: data,
        };
      },
      transformErrorResponse: (response) =>
        response?.data?.message ?? "Internal server error",
      invalidatesTags: [{ type: "Developer", id: "LIST" }],
    }),
    deleteDeveloper: builder.mutation({
      query: (id) => ({
        url: `/master/pengembang/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) =>
        response?.data?.message ?? "Internal server error",
      invalidatesTags: () => [{ type: "Developer", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useDevelopersQuery,
  useUpdateDeveloperMutation,
  useCreateDeveloperMutation,
  useDeleteDeveloperMutation,
  useValidationNpwpDeveloperMutation,
} = developerManagementApi;
