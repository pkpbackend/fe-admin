import { v3ApiNew } from "@api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Filter"],
});
const filterApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    filterPengusulanTahunUsulan: builder.query({
      query: () => ({
        url: "/pengusulan/filter/tahunusulan",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useFilterPengusulanTahunUsulanQuery } = filterApi;
