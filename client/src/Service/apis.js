const BASE_URL = process.env.NODE_ENV === 'production'
    ? "https://talk-time-vqvp.onrender.com/api"  // Your production URL
    : "http://localhost:4000/api";               // Local development URL


export const authEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    LOGOUT_API: BASE_URL + "/auth/logout",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const chatEndPoints = {
    SEARCH_USER_API: BASE_URL + "/chat/search-user",
    CREATE_CHAT_API: BASE_URL + "/chat/create-chat",
    GET_ALL_CHAT_API: BASE_URL + "/chat/get-chat",
    CREATE_GROUP_CHAT_API: BASE_URL + "/chat/create-group-chat",
    RENAME_CHAT_API: BASE_URL + "/chat/rename-group",
    ADD_TO_GROUP_API: BASE_URL + "/chat/add-to-group",
    REMOVE_FROM_GROUP_API: BASE_URL + "/chat/remove-from-group",
    SEARCH_TO_ADD_GROUP_API: BASE_URL + "/chat/search-for-create-group"
}


export const messageEndPoints = {
    SEND_MESSAGE_API: BASE_URL + "/chat/message/send-message",
    GET_MESSAGE_API: BASE_URL + "/chat/message/allMessages"
}

export const userEndPoints = {
    UPDATE_USER_DETAILS: BASE_URL + "/chat/updateUser",
    CONTACT_US_ENDPOINTS: BASE_URL + "/chat/contactUs"
}