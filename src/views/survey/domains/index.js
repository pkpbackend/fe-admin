import { v3ApiNew } from "../../../api/ApiCallV3New"

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Survey"],
})
const surveyApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    summary: builder.query({
      query: () => {
        return {
          url: "/portalperumahan/survey/summary",
        }
      },
    }),
    respondens: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg }
        params.filtered = JSON.stringify(filtered || [])
        if (sorted) {
          params.sorted = sorted
        }
        return {
          url: "/portalperumahan/survey/responden",
          params,
        }
      },
    }),
    responden: builder.query({
      query: (id) => {
        return {
          url: `/portalperumahan/survey/responden/${id}`,
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { 
  useSummaryQuery, 
  useRespondensQuery, 
  useRespondenQuery, 
} = surveyApi
