// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null
  },
  reducers: {
    setAuthUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload.user
      } else {
        state.user = null
      }
    }
  }
})

export const { setAuthUser } = authSlice.actions

export default authSlice.reducer
