import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    view: false,
    searchResults: [],
    viewCreateGroup: false,
    selectedChat: null
}

export const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setView: (state, action) => {
            state.view = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        setViewCreateGroup: (state, action) => {
            state.viewCreateGroup = action.payload
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        }
    }
});

export const { setUser, setLoading, setView, setSearchResults, setViewCreateGroup, setSelectedChat } = profileSlice.actions;
export default profileSlice.reducer;