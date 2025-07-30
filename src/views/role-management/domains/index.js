/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Role"],
});
const roleManagementApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    roles: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/sso/role",
          params: params,
        };
      },
      providesTags: () => {
        return [{ type: "Role", id: "LIST" }];
      },
    }),
    role: builder.query({
      query: (id) => {
        return {
          url: `/sso/role/${id}`,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Role", id }],
    }),
    createRole: builder.mutation({
      query: (data) => {
        return {
          url: "/sso/role",
          method: "POST",
          body: data,
        };
      },
      transformErrorResponse: (error) =>
        error?.data?.message ?? "Internal server error",
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),
    updateRole: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/sso/role/${id}`,
          method: "PUT",
          body: data,
        };
      },
      transformErrorResponse: (error) =>
        error?.data?.message ?? "Internal server error",
      invalidatesTags: (result, error, { id }) => {
        return result ? [{ type: "Role", id: id }] : [];
      },
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/sso/role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Role", id: "LIST" }],
    }),
    scopeRegion: builder.query({
      query: (args) => {
        return {
          url: "/sso/scoperegionrole",
          params: args,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: () => {
        return [{ type: "Role", id: "SCOPE REGION" }];
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useRolesQuery,
  useRoleQuery,
  useUpdateRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useScopeRegionQuery,
} = roleManagementApi;
