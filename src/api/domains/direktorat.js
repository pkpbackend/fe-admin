import { v3ApiNew } from "../ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Direktorat"],
});
const direktoratApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    direktorat: builder.query({
      query: (arg) => {
        return {
          url: "/master/direktorat",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ["Direktorat"],
    }),
  }),
  overrideExisting: true,
});

export const { useDirektoratQuery } = direktoratApi;
