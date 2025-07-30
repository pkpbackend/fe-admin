import { v3ApiNew } from "../ApiCallV3New";
import apiHook from "../hooks";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Theme", "Pengaturan"],
});

const portalPerumahanApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    pengaturan: builder.query({
      query: (arg) => {
        return {
          url: "/portalperumahan/pengaturan",
          params: {
            ...arg,
          },
        };
      },
      invalidatesTags: [],
    }),
    pengaturanById: builder.query({
      query: (arg) => {
        return {
          url: `/portalperumahan/pengaturan/${arg?.id || ""}`,
        };
      },
    }),
    pengaturanByKey: builder.query({
      query: (key) => {
        return {
          url: `/portalperumahan/pengaturan`,
          params: { filtered: JSON.stringify([{ id: "eq$key", value: key }]) },
        };
      },
      transformResponse: (response) => {
        return response?.data?.length > 0 ? response?.data[0] : null;
      },
      providesTags: (result, error, { id, key }) => [
        { type: "Pengaturan", key },
      ],
    }),
    submitPengaturan: builder.mutation({
      query: (args) => {
        return {
          url: `/portalperumahan/pengaturan/${args?.id || ""}`,
          method: args?.id ? "PUT" : "POST",
          body: {
            ...args,
            id: undefined,
          },
        };
      },
      invalidatesTags: (result, error, { id, key }) => [
        { type: "Pengaturan", id },
        { type: "Pengaturan", key },
        "Theme",
      ],
    }),
    deletePengaturan: builder.mutation({
      query: (args) => {
        return {
          url: `/portalperumahan/pengaturan/${args?.id || ""}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Pengaturan", id }],
    }),
    uploadFilePengaturan: builder.mutation({
      query: (body) => {
        return {
          url: `/portalperumahan/pengaturan/upload`,
          method: "POST",
          body,
        };
      },
    }),
    invalidatesTags: () => [{ type: "Pengaturan", id: "slider" }],
  }),
  overrideExisting: true,
});

// const { usePengaturanQuery } = portalPerumahanApi;
export const usePengaturan = (options = {}) =>
  apiHook(portalPerumahanApi.usePengaturanQuery, options);

export const {
  useSubmitPengaturanMutation,
  useDeletePengaturanMutation,
  usePengaturanByIdQuery,
  usePengaturanByKeyQuery,
  useUploadFilePengaturanMutation,
} = portalPerumahanApi;
