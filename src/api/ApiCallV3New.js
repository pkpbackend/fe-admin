import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URLV3 } from "@constants/app";
import { getAuthV3 } from "@utils/auth";
import { wrongLogin } from "@utils/LoginHelpers";

export const v3ApiNew = createApi({
  reducerPath: "apiV3New",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URLV3}/v3`,
    prepareHeaders: (headers) => {
      const token = getAuthV3(true);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    validateStatus: (response) => {
      if (response.status === 401 || response.status === 403) {
        wrongLogin();
      }
      if (![200, 201].includes(response.status)) {
        return false;
      }
      return true;
    },
  }),
  endpoints: () => ({}),
});
