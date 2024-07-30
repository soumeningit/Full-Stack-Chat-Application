import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signUpData: {},
    otp: null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignUpData(state, action) {
            state.signUpData = action.payload;
        },
        setOtp(state, action) {
            state.otp = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        }
    }
});

export const { setSignUpData, setOtp, setToken } = authSlice.actions;
export default authSlice.reducer;