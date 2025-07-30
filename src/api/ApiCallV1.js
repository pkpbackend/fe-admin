import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BACKEND_BASE_URL } from "../constants/app"
import { getAuth } from "../utility/auth"

export const v1Api = createApi({
  reducerPath: "apiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = getAuth(true)
      if (token) {
        headers.set("token", `${token}`)
      }
      return headers
    }
  }),
  endpoints: () => ({})
})
