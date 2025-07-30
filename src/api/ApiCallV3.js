import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URL, URLs } from "../constants/app";
import { getAuthV3 } from "../utility/auth";

export const v3Api = createApi({
  reducerPath: "apiV3",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthV3(true);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
