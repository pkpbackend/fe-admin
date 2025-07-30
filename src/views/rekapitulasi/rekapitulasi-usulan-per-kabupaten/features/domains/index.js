/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "@api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Rekapitulasi Matrix Kabupaten"],
});
const rekapitulasiMatrixKabupaten = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    rekapitulasiPerKabupaten: builder.query({
      query: ({ filtered, ...arg }) => {
        const params = { ...arg };
        if (filtered) {
          params.filtered = JSON.stringify(filtered);
        }
        return {
          url: "/pengusulan/usulan/matrix/kabupaten",
          params: params,
        };
      },
      providesTags: [
        {
          type: "Rekapitulasi Matrix Kabupaten",
          id: "LIST",
        },
      ],
    }),
    rekapitulasiPerKabupatenExport: builder.query({
      query: ({ fileType, sorted, filtered, ...arg }) => {
        const params = { ...arg };
        if (filtered) {
          params.filtered = JSON.stringify(filtered);
        }
        return {
          url: `/pengusulan/usulan/matrix/kabupaten/export/${fileType}`,
          params: params,
        };
      },
      providesTags: [
        {
          type: "Rekapitulasi Matrix Kabupaten",
          id: "EXPORT",
        },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRekapitulasiPerKabupatenQuery,
  useLazyRekapitulasiPerKabupatenExportQuery,
} = rekapitulasiMatrixKabupaten;
