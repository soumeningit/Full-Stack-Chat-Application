import React from 'react';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { otpSenderAPI, signup } from '../Service/Operation/AuthAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function OTPForm() {

    const { signUpData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');

    const [visible, setVisible] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(otp);
        console.log("signUpData : ", signUpData);
        signUp();
    }

    const signUp = async () => {
        try {

            const formData = {};
            formData['otp'] = otp;
            formData['firstName'] = signUpData.firstName;
            formData['lastName'] = signUpData.lastName;
            formData['email'] = signUpData.email;
            formData['password'] = signUpData.password;
            formData['confirmPassword'] = signUpData.confirmPassword;

            console.log("form data inside calling : ", formData);

            const signUpResponse = await signup(formData);
            console.log("sign up response : ", signUpResponse);

            toast.success("Sign UP Successfully")
            navigate("/login")

        } catch (error) {
            console.log("Sign up api call failed.." + error);
        }
    }

    const handleExit = (event) => {
        event.preventDefault();
        setVisible(!visible);
        navigate("/signup")
    }

    async function resendOtp(event) {
        event.preventDefault();
        const data = {}
        data['email'] = signUpData.email;
        data['firstName'] = signUpData.firstName;

        try {
            const sendOtp = await otpSenderAPI(data);
            console.log("sendOtp : ", sendOtp);
            if (sendOtp) {
                toast.success("Otp sent successfully");
            }
        }
        catch (e) {
            console.log("Error while re-sending otp : ", e);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            {
                visible &&

                <form
                    onSubmit={handleSubmit}
                    className="max-w-72 sm:w-72 h-auto bg-white bg-opacity-30 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-8 gap-4 rounded-lg shadow-lg relative"
                >
                    <span className="text-xl font-bold text-gray-900">Enter OTP</span>
                    <p className="text-sm text-black text-center leading-5">We have sent a verification code to your registerd email.</p>
                    <div className="w-full flex flex-row gap-2 justify-center">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-12 sm:w-14 border-0 bg-[#E4E4E4] text-[#2C2C2C] caret-[#7F81FF] rounded-md aspect-square text-center focus:border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
                    >
                        Verify
                    </button>
                    <button
                        type="button"
                        onClick={handleExit}
                        className="absolute top-1 right-1 w-6 h-6 bg-white shadow-md rounded-full text-black text-lg leading-none focus:outline-none"
                    >
                        ×
                    </button>
                    <p className="text-sm text-black flex flex-col items-center gap-1">
                        Didn't receive the code? <button
                            onClick={resendOtp}
                            className="bg-transparent border-0 text-blue-500 cursor-pointer text-sm font-bold">Resend Code</button>
                    </p>
                </form>
            }
        </div>
    );
}

export default OTPForm;
