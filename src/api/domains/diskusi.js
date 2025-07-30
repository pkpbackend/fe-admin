import { v3ApiNew } from "../ApiCallV3New";

const apiWithTag = v3ApiNew.enhanceEndpoints({
  addTagTypes: ["Helpdesk", "HelpdeskChats", "HelpdeskGlosarry"],
});
const helpdeskApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    helpdesk: builder.query({
      query: ({ filtered, sorted, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(filtered || []);
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: "/master/helpdesk",
          params,
        };
      },
      providesTags: [{ type: "Helpdesk", id: "LIST" }],
    }),
    detailHelpdesk: builder.query({
      query: (id) => {
        return {
          url: `/master/helpdesk/${id}`,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (_, __, id) => [{ type: "Helpdesk", id }],
    }),
    closeHelpdeskDiscussionTicket: builder.mutation({
      query: (id) => {
        return {
          url: `/master/helpdesk/${id}`,
          method: "PUT",
          body: {
            status: true,
          },
        };
      },
      transformErrorResponse: (response) => {
        return response?.data?.message ?? "Internal server error";
      },
      invalidatesTags: (result, __, { id }) =>
        result ? [{ type: "Helpdesk", id }] : [],
    }),
    createHelpdesk: builder.mutation({
      query: (args) => {
        return {
          url: "/master/helpdesk",
          method: "POST",
          body: args,
        };
      },
      transformErrorResponse: (response) => {
        return response?.data?.message ?? "Internal server error";
      },
      invalidatesTags: [{ type: "Helpdesk", id: "LIST" }],
    }),
    discussionTopics: builder.query({
      query: (arg) => {
        return {
          url: "/master/helpdesk/topik-diskusi",
          params: {
            ...arg,
          },
        };
      },
      transformResponse: (response) => response.data,
    }),
    helpdeskChats: builder.query({
      query: ({ id, filtered = [], sorted, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(
          [...filtered, { id: "eq$HelpdeskId", value: id }] || []
        );
        if (sorted) {
          params.sorted = sorted;
        }
        return {
          url: `/master/helpdesk/chats`,
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (_, __, { id }) => [{ type: "HelpdeskChats", id }],
    }),
    createHelpdeskDiscussionChat: builder.mutation({
      query: (data) => {
        return {
          url: `/master/helpdesk/${data.id}/chat`,
          method: "POST",
          body: {
            HelpdeskUserId: data?.HelpdeskUserId ?? null,
            chat: data.chat,
          },
        };
      },
      transformErrorResponse: (response) => {
        return response?.data?.message ?? "Internal server error";
      },
      invalidatesTags: (result, __, { id }) =>
        result ? [{ type: "HelpdeskChats", id }] : [],
    }),
    glossary: builder.query({
      query: ({ direktoratId, helpdeskTopikDiskusiId, ...arg }) => {
        const params = { ...arg };
        params.filtered = JSON.stringify(
          [
            { id: "DirektoratId", value: direktoratId },
            { id: "HelpdeskTopikDiskusiId", value: helpdeskTopikDiskusiId },
          ] || []
        );

        return {
          url: `/master/helpdesk/glosarry`,
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: (_, __, { direktoratId, helpdeskTopikDiskusiId }) => [
        { type: "HelpdeskGlosarry", direktoratId, helpdeskTopikDiskusiId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateHelpdeskMutation,
  useDiscussionTopicsQuery,
  useHelpdeskChatsQuery,
  useHelpdeskQuery,
  useDetailHelpdeskQuery,
  useCloseHelpdeskDiscussionTicketMutation,
  useCreateHelpdeskDiscussionChatMutation,
  useGlossaryQuery,
} = helpdeskApi;
