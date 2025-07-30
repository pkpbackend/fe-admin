/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["User"],
});
const userManagementApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/sso/user",
          params: params,
        };
      },
      providesTags: (result) => {
        return [{ type: "User", id: "LIST" }];
      },
    }),
    user: builder.query({
      query: (id) => {
        return {
          url: `/sso/user/${id}`,
        };
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/sso/user",
          method: "POST",
          body: data,
        };
      },
      transformErrorResponse: (error) =>
        error?.data?.message ?? "Internal server error",
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/sso/user/${id}`,
          method: "PUT",
          body: data,
        };
      },
      transformErrorResponse: (error) =>
        error?.data?.message ?? "Internal server error",
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/sso/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUsersQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userManagementApi;
