// ** Redux Imports
import rootReducer from "./rootReducer"
import { configureStore } from "@reduxjs/toolkit"
import { v1Api } from "../api/ApiCallV1"
import { v3Api } from "../api/ApiCallV3"
import { newApi } from "../api/ApiCallNew"
import { v3ApiNew } from "../api/ApiCallV3New"

const store = configureStore({
  reducer: {
    ...rootReducer,
    [v1Api.reducerPath]: v1Api.reducer,
    [v3Api.reducerPath]: v3Api.reducer,
    [newApi.reducerPath]: newApi.reducer,
    [v3ApiNew.reducerPath]: v3ApiNew.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(v1Api.middleware)
      .concat(v3Api.middleware)
      .concat(newApi.middleware)
      .concat(v3ApiNew.middleware)
  }
})

export { store }
