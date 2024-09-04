import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../apis";
import toast from "react-hot-toast";


const { UPDATE_USER_DETAILS, CONTACT_US_ENDPOINTS } = userEndPoints;

export const updateUserDetailsAPI = async (data, token) => {

    // data:{chatId,userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    console.log("data : ", data)
    try {
        const response = await apiConnector('POST', UPDATE_USER_DETAILS, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("response in update user details : ", response)

        if (!response?.data?.success) {
            throw new Error("UPDATE USER DETAILS FAILED....")
        }
        result = response.data;

    } catch (e) {
        console.log("Error in calling update user details API...");
        console.log(e)
        toast.error("Update user api Failed")
    }

    toast.dismiss(toastId);
    return result;
}

export const contactUs = async (data, token) => {

    // data:{chatId,userId}

    let result = [];
    const toastId = toast.loading("Loading....")
    console.log("data : ", data)
    try {
        const response = await apiConnector('POST', CONTACT_US_ENDPOINTS, data, {
            Authorization: `Bearer ${token}`
        });
        console.log("response in contact us : ", response)

        if (!response?.data?.success) {
            throw new Error("CONTACT US FAILED....")
        }
        result = response.data;

    } catch (e) {
        console.log("Error in calling contact us API...");
        console.log(e)
        toast.error("Update contact us api Failed")
    }

    toast.dismiss(toastId);
    return result;
}

