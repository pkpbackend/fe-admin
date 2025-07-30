/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "@api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Document"],
});
const masterDocumentApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    masterCategoryDocument: builder.query({
      query: (arg) => {
        return {
          url: `/master/masterkategoridokumen/all`,
          params: arg,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useMasterCategoryDocumentQuery } = masterDocumentApi;
