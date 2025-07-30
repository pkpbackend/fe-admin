import { v3ApiNew } from "@api/ApiCallV3New";

const masterApi = v3ApiNew.injectEndpoints({
  endpoints: (builder) => ({
    penerimaManfaat: builder.query({
      query: (arg) => {
        return {
          url: "/master/penerimamanfaat",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ["PenerimaManfaat"],
    }),
    KRO: builder.query({
      query: (arg) => {
        return {
          url: "/master/kro",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ["Kro"],
    }),
    RO: builder.query({
      query: (arg) => {
        return {
          url: "/master/ro",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ["Ro"],
    }),
  }),
  overrideExisting: true,
});

export const { usePenerimaManfaatQuery, useKROQuery, useROQuery } = masterApi;
