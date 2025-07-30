import { v3ApiNew } from "../ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Notification"],
});
const notificationApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query({
      query: ({ sorted, filtered, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/portalperumahan/notification",
          params: params,
        };
      },
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),
    readNotification: builder.mutation({
      query: ({id}) => {
        return {
          url: `/portalperumahan/notification/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Notification", id: "LIST" }] : [],
    }),
    readAllNotification: builder.mutation({
      query: () => {
        return {
          url: "/portalperumahan/notification/read/all",
          method: "GET",
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Notification", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useNotificationsQuery,
  useReadNotificationMutation,
  useReadAllNotificationMutation,
} = notificationApi;
