import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BACKEND_BASE_URL } from "../constants/app"
import { getAuth } from "../utility/auth"

export const newApi = createApi({
  reducerPath: "apiNew",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/v1`,
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
