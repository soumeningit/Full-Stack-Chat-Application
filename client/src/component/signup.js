import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { setSignUpData } from '../redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { otpSenderAPI } from '../Service/Operation/AuthAPI';
import toast from 'react-hot-toast';

function SignUp() {

    const [formData, setFormData] = useState({ firstName: "", lastName: "", password: "", confirmPassword: "", email: "" })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData(
            (prevData) => {
                return {
                    ...prevData,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password Mismatch");
            return;
        }
        console.log("formData : ", formData)
        dispatch(setSignUpData(formData));
        const data = {};
        data.firstName = formData.firstName;
        data.email = formData.email;
        console.log("Data : ", data);
        const OTPResponse = await otpSenderAPI(data, navigate);
        console.log("OTPResponse : ", OTPResponse);
    }
    return (
        <div className='container'>
            <div className='main'>
                <form
                    onSubmit={submitHandler}
                    className="form">
                    <p className="title">Register </p>
                    <p class="message">Signup now and get full access to our app. </p>
                    <div className="flex">
                        <label>
                            <input required placeholder=""
                                type="text"
                                name='firstName'
                                value={formData.firstName}
                                onChange={changeHandler}
                                className="input" />
                            <span>Firstname</span>
                        </label>

                        <label>
                            <input required placeholder="" type="text"
                                name='lastName'
                                value={formData.lastName}
                                onChange={changeHandler}
                                className="input" />
                            <span>Lastname</span>
                        </label>
                    </div>

                    <label>
                        <input required placeholder=""
                            name='email'
                            value={formData.email}
                            onChange={changeHandler}
                            type="email" className="input" />
                        <span>Email</span>
                    </label>

                    <label>
                        <input required placeholder=""
                            name='password'
                            value={formData.password}
                            onChange={changeHandler}
                            type="password" className="input" />
                        <span>Password</span>
                    </label>
                    <label>
                        <input required placeholder=""
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            type="password" className="input" />
                        <span>Confirm password</span>
                    </label>
                    <button className="submit">Submit</button>
                    <p className="signin">Already have an acount ? <Link to="/login">Signin</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp;