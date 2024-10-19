import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload
            state.user = action.payload.user
        },
        logout: (state) => {
            state.token = null
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer