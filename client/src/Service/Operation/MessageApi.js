import { messageEndPoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

const {
    SEND_MESSAGE_API,
    GET_MESSAGE_API
} = messageEndPoints;

export const getMessage = async (data, token) => {

    // data:{chatId,userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", GET_MESSAGE_API, data, {
            Authorization: `Bearer ${token}`
        })

        // console.log("response in getMessage API....", response);

        if (!response) {
            throw new Error("GET MESSAGE CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling getChat from get chat API...");
        console.log(e)
        toast.error("Get Message Failed")
    }

    toast.dismiss(toastId);
    return result;
}


export const sendMessage = async (data, token) => {

    // data:{chatId,userId}

    console.log("Data in sendMessage API : ", data);

    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", SEND_MESSAGE_API, data, {
            Authorization: `Bearer ${token}`
        })

        // console.log("response in sendMessage API....", response);

        if (!response?.data?.success) {
            throw new Error("SEND MESSAGE CHAT API FAILED....")
        }
        result = response?.data;
    } catch (e) {
        console.log("Error in calling sendMessage from send message chat API...");
        console.log(e)
        toast.error("Send message Chat Failed")
    }

    toast.dismiss(toastId);
    return result;
}