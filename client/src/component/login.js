import React from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Service/Operation/AuthAPI';
import toast from "react-hot-toast"
import { useState } from 'react';
import { useDispatch } from "react-redux";

function LogIn() {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const dispatch = useDispatch();

    function changeHandler(event) {
        setFormData((prevdata) => {
            return {
                ...prevdata,
                [event.target.name]: event.target.value
            }
        })
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await login(formData, dispatch);
            console.log("flag in login " + response[0]?.flag);
            console.log("response in login " + JSON.stringify(response));
            if (response[0]?.flag) {
                toast.success("SuccessFull Login")
                navigate("/chat")
            }
        }
        catch (e) {
            console.log(e);
            toast.error("Log In Failed")
        }
    }


    return (
        <div className='container'>
            <div className='main'>
                <form onSubmit={submitHandler}
                    className="form">
                    <p className="title">SignIn </p>
                    <p className="message">Login now and get full access to our app. </p>
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
                    <p className="signin"> Forgot Password? <Link to="/forgot-password">Click Here</Link> </p>
                    <p className="signin"> Dont't have an account? <Link to="/signup">Click Here</Link> </p>
                    <button type='submit'
                        className="submit">Submit</button>
                </form>
            </div>

        </div >
    )
}

export default LogIn;