import { chatEndPoints } from "../apis"
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast"

const {
    SEARCH_USER_API,
    CREATE_CHAT_API,
    GET_ALL_CHAT_API,
    CREATE_GROUP_CHAT_API,
    RENAME_CHAT_API,
    ADD_TO_GROUP_API,
    REMOVE_FROM_GROUP_API,
    SEARCH_TO_ADD_GROUP_API
} = chatEndPoints;

export const searchUser = async (data, token) => {

    // data:{firstName,lastName}

    console.log("INSIDE SEARCH USER API....")

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        console.log("DATA  IN SEARCH USER API : ", data)
        const response = await apiConnector("POST", SEARCH_USER_API, data, {
            Authorization: `Bearer ${token}`
        })

        console.log("RESPONSE IN SEARCH USER API ....", response)

        if (!response) {
            throw new Error("SEARCH API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling Search API...");
        console.log(e)
        toast.error("Search Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const createChat = async (data, token) => {

    // data:{userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", CREATE_CHAT_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("CREATE CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling create chat API...");
        console.log(e)
        toast.error("Create Chat Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const getChat = async (token) => {

    // data:{}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("GET", GET_ALL_CHAT_API, null, {
            Authorization: `Bearer ${token}`
        })

        console.log("response in getChat API ", response);

        if (!response?.data?.success) {
            throw new Error("GET ALL CHAT API FAILED....")
        }
        result = response;
    } catch (e) {
        console.log("Error in calling get all chat API...");
        console.log(e)
        toast.error("Get All Chat Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const createGroup = async (data, token) => {

    // data:{name,users}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", CREATE_GROUP_CHAT_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("CREATE GROUP ALL CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling create group chat API...");
        console.log(e)
        toast.error("CREATE GROUP Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const renameChat = async (data, token) => {

    // data:{chatId,name:newName}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", RENAME_CHAT_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("RENAME CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling rename chat API...");
        console.log(e)
        toast.error("Rename Chat Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const addToGroup = async (data, token) => {

    // data:{chatId,userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", ADD_TO_GROUP_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("ADD TO GROUP CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling add to group chat API...");
        console.log(e)
        toast.error("Add to group Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const removeFromGroup = async (data, token) => {

    // data:{chatId,userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", REMOVE_FROM_GROUP_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("REMOVE CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling remove from group chat API...");
        console.log(e)
        toast.error("Remove from Chat Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const findForCreategroup = async (searchTerm, token) => {

    // data:{chatId,userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    console.log("searchTerm : ", searchTerm)
    try {
        const response = await apiConnector('GET', `${SEARCH_TO_ADD_GROUP_API}?search=${searchTerm}`, null, {
            Authorization: `Bearer ${token}`
        });
        console.log("response in findForCreategroup : ", response)

        if (!response?.data?.success) {
            throw new Error("REMOVE CHAT API FAILED....")
        }
        result = response.data;

    } catch (e) {
        console.log("Error in calling remove from group chat API...");
        console.log(e)
        toast.error("Remove from Chat Failed")
    }

    toast.dismiss(toastId);
    return result;
}