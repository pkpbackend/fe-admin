import { v3ApiNew } from "../ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Access Menu"],
});
const accessMenuApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    accessMenu: builder.query({
      query: (arg) => {
        return {
          url: "/sso/accessmenu",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ["Access Menu"],
    }),
  }),
  overrideExisting: true,
});

export const { useAccessMenuQuery } = accessMenuApi;
