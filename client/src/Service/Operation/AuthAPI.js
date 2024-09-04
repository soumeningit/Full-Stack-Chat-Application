import toast from "react-hot-toast";
import { authEndPoints } from "../apis"
import { apiConnector } from "../apiConnector";
import { setOtp } from "../../redux/Slices/AuthSlice";
import { setToken } from "../../redux/Slices/AuthSlice";

const {
    SENDOTP_API,
    SIGNUP_API, LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = authEndPoints;


export const otpSenderAPI = async (data, navigate) => {
    let result = "";
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("POST", SENDOTP_API, data);
        console.log("Response in sigh up api call....", response)
        result = response?.data;

        if (!response?.data?.success) {
            throw new Error("SIGN UP API CALL FAILED....")
        }

        if (response) {
            toast.success("OTP sent successfully")
            setOtp(response?.data);
            navigate("/otp-send")
        }

    } catch (error) {
        toast.error("Sign UP Failed")
        console.error("SIGN UP API CALLED FAILED.... " + error);
    }

    toast.remove(toastId);
    return result;

}

export const signup = async (formData) => {
    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        console.log("INSIDE SIGN UP API ....", formData)
        const response = await apiConnector("POST", SIGNUP_API, formData);
        console.log("Response in sigh up api call....", response)
        result.push(response.data);

        if (!response?.data?.success) {
            throw new Error("SIGN UP API CALL FAILED....")
        }

    } catch (error) {
        toast.error("Sign UP Failed")
        console.error("SIGN UP API CALLED FAILED.... " + error);
    }

    toast.remove(toastId);
    return result;

}

export const login = async (data, dispatch) => {
    let result = [];
    const toastId = toast.loading("Loading....")
    try {
        console.log("INSIDE LOG IN API ....", data)
        const response = await apiConnector("POST", LOGIN_API, data);
        console.log("Response in log in api call....", response)
        result.push(response.data);

        if (!response?.data?.success) {
            throw new Error("LOG IN API CALL FAILED....")
        }

        dispatch(setToken(response.data.token));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

    } catch (error) {
        toast.error("LOG IN FAILED")
        console.error("SIGN UP API CALLED FAILED.... " + error);
    }

    toast.remove(toastId);
    return result;

}

export function resetPassworedToken(email, setisemailSent) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })
            console.log("RESET PASSWORD TOKEN API RESPONSE : ", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset password token sent to your email")
            setisemailSent(true)
            // navigate("/update-password")
        }
        catch (e) {
            console.log("Reset Password generation failed!")
            console.log("RESET PASSWORD TOKEN API ERROR : ", e)
        }

    }
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {

        console.log("Inside reset Password API....")
        console.log("PASSWORD : ", password, " CONFIRM PASSWORD : ", confirmPassword, " TOKEN : ", token)

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password, confirmPassword, token
            });

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            console.log("Response : ", response);
            toast.success("Password updated successfully")
        }
        catch (e) {
            toast.error("Password Update Failed")
            console.log("Reset Password generation failed!")
            console.log("RESET PASSWORD TOKEN API ERROR : ", e)
        }

    }
}

