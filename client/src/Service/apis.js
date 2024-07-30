const BASE_URL = "http://localhost:4000/api"

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