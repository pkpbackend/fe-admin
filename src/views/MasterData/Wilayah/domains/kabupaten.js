import { v3ApiNew } from "../../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["City"],
});

const masterCityApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    cities: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/city",
          params: params,
        };
      },
      providesTags: [{ type: "City", id: "LIST" }],
    }),
    city: builder.query({
      query: (id) => {
        return {
          url: `/master/city/${id}`,
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "City", id }] : [],
    }),
    createCity: builder.mutation({
      query: (values) => {
        const formData = new FormData();
        for (const key in values) {
          if (Object.hasOwnProperty.call(values, key)) {
            const value = values[key];
            formData.append(key, value !== null ? value : "");
          }
        }
        return {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `/master/city`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "City", id: "LIST" }] : [],
    }),
    updateCity: builder.mutation({
      query: ({ id, ...values }) => {
        const formData = new FormData();
        for (const key in values) {
          if (Object.hasOwnProperty.call(values, key)) {
            const value = values[key];
            formData.append(key, value !== null ? value : "");
          }
        }
        return {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `/master/city/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "City", id: "LIST" }] : [],
    }),
    deleteCity: builder.mutation({
      query: (id) => {
        return {
          url: `/master/city/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "City", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCitiesQuery,
  useCityQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = masterCityApi;
