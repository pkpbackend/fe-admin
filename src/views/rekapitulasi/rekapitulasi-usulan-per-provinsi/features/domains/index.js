/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "@api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Rekapitulasi Matrix Provinsi"],
});
const rekapitulasiMatrixProvinsi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    rekapitulasiPerProvinsi: builder.query({
      query: ({ filtered, ...arg }) => {
        const params = { ...arg };
        if (filtered) {
          params.filtered = JSON.stringify(filtered);
        }

        return {
          url: "/pengusulan/usulan/matrix/provinsi",
          params: params,
        };
      },
      providesTags: [
        {
          type: "Rekapitulasi Matrix Provinsi",
          id: "LIST",
        },
      ],
    }),
    rekapitulasiPerProvinsiExport: builder.query({
      query: ({ fileType, filtered, ...arg }) => {
        const params = { ...arg };
        if (filtered) {
          params.filtered = JSON.stringify(filtered);
        }
        return {
          url: `/pengusulan/usulan/matrix/provinsi/export/${fileType}`,
          params: params,
        };
      },
      providesTags: [
        {
          type: "Rekapitulasi Matrix Provinsi",
          id: "EXPORT",
        },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRekapitulasiPerProvinsiQuery,
  useLazyRekapitulasiPerProvinsiExportQuery,
} = rekapitulasiMatrixProvinsi;
