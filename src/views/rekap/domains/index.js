import { v3ApiNew } from "@api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Rekapitulasi"],
});

const rekapitulasiApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    rekapitulasi: builder.query({
      query: (params) => {
        return {
          url: "/rekapusulan",
          params,
        };
      },
    }),
    rekapitulasiPerDirektorat: builder.query({
      query: (tahunUsulan) => {
        return {
          url: "/pengusulan/usulan/rekapitulasi/per-direktorat",
          params: { tahunUsulan },
        };
      },
    }),
    rekapitulasiPerProvinsi: builder.query({
      query: ({ direktoratId, tahunUsulan }) => {
        return {
          url: "/pengusulan/usulan/rekapitulasi/per-provinsi",
          params: { direktoratId, tahunUsulan },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useRekapitulasiQuery,
  useRekapitulasiPerDirektoratQuery,
  useRekapitulasiPerProvinsiQuery,
} = rekapitulasiApi;
