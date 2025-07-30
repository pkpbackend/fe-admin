import { v3ApiNew } from "@api/ApiCallV3New";

const DEFAULT_THEME = {
  name: "Default",
  primaryColor: "#273763",
  secondaryColor: "#ffc928",
  applied: true,
};

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Theme"],
});
const themeApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    theme: builder.query({
      query: () => ({
        url: `/portalperumahan/pengaturan`,
        params: {
          filtered: JSON.stringify([{ id: "eq$key", value: "theme" }]),
        },
      }),
      providesTags: ["Theme"],
      transformResponse(response) {
        const data = response?.data?.[0]?.params;
        const appliedTheme = data
          ? JSON.parse(data)?.find((theme) => theme.applied)
          : DEFAULT_THEME;
        return appliedTheme ? appliedTheme : DEFAULT_THEME;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useThemeQuery } = themeApi;
