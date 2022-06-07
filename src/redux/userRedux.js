import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        password: "",
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.username;
            state.password = action.payload.password;     
        },
        logOut: (state) => {
            state.name = "";
            state.password = "";
        }
    },
});

export const { login, logOut } = userSlice.actions;
export default userSlice.reducer;
