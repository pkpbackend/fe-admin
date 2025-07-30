import { v3ApiNew } from "../../../api/ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Setting"],
});
const settingApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    settingGroup: builder.query({
      query: () => {
        return {
          url: "/portalperumahan/setting/group",
        };
      },
    }),
    setting: builder.query({
      query: (key) => ({
        url: `/portalperumahan/setting/${key}`,
      }),
    }),
    updateSetting: builder.mutation({
      query: ({ key, ...data }) => {
        return {
          url: `/portalperumahan/setting/${key}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    synchronizeRusus: builder.query({
      query: () => {
        return {
          url: `/rusus/synchronize-usulan`,
        };
      },
    }),
    synchronizeEmon: builder.query({
      query: () => {
        return {
          url: `/synchronize-emon`,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useSettingGroupQuery,
  useSettingQuery,
  useUpdateSettingMutation,
  useLazySynchronizeRususQuery,
  useLazySynchronizeEmonQuery,
} = settingApi;
