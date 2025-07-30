/* eslint-disable no-confusing-arrow */
import { v3ApiNew } from "@api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Pengusulan_RUK"],
});
const pengusulanRUKApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    usulanRuk: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        if (sorted) {
          params.sorted = JSON.stringify(sorted);
        }
        params.filtered = JSON.stringify([
          ...(filtered ? filtered : []),
          { id: "ne$statusTerkirim", value: "belum terkirim" },
          { id: "DirektoratId", value: 4 },
        ]);

        return {
          url: "/pengusulan/usulan",
          params: params,
        };
      },
      providesTags: (result) => {
        return [{ type: "Pengusulan_RUK", id: "LIST" }];
      },
    }),
    detailRekapMatrixRuk: builder.query({
      query: ({ UsulanId, ...arg }) => {
        return {
          url: `/pengusulan/usulan/matrix-ruk/${UsulanId}`,
          params: arg,
        };
      },
      providesTags: (result, error, payload) => {
        return result ? [{ type: "Pengusulan_RUK", id: payload.UsulanId }] : [];
      },
    }),
    rekapMatrixRukExportExcel: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        if (sorted) {
          params.sorted = JSON.stringify(sorted);
        }
        params.filtered = JSON.stringify([
          ...(filtered ? filtered : []),
          { id: "ne$statusTerkirim", value: "belum terkirim" },
          { id: "DirektoratId", value: 4 },
        ]);
        return {
          url: "/pengusulan/usulan/matrix/export/excel",
          params: params,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyRekapMatrixRukExportExcelQuery,
  useUsulanRukQuery,
  useLazyDetailRekapMatrixRukQuery,
} = pengusulanRUKApi;
