const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.otpSender = async (req, res) => {
    try {

        const { email, firstName } = req.body;
        if (!email || !firstName) {
            return res.status(400).json({ message: "Please enter all fields" })
        }
        // check user already resent or not
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already exsist" })
        }
        // generate OTP
        let generatedOtp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        let exsistingOTP = await OTP.findOne({ otp: generatedOtp })

        while (exsistingOTP) {
            generatedOtp = otpGenerator.generate(4, {
                upperCaseAlphabets: false,
                specialChars: false, lowerCaseAlphabets: false
            });
            exsistingOTP = await OTP.findOne({ otp: generatedOtp })

        }

        const otpPayload = {
            otp: generatedOtp,
            email: email,
            name: firstName,
        }

        console.log("otpPayload : ", otpPayload)

        const newOtp = await OTP.create(otpPayload);
        console.log("newOtp : ", newOtp);

        res.status(200).json({
            success: true,
            message: "Otp generated Successfully",
            generatedOtp,
        })

    } catch (error) {
        console.log(error);
        return res.status.json({ success: false, message: "OTP generation Failed" })
    }
}

exports.signUp = async (req, res) => {
    try {
        console.log("req : ", req);

        const { email, password, confirmPassword, firstName, lastName, otp } = req.body;

        if (!email || !password || !confirmPassword || !firstName || !lastName || !otp) {
            return res.status(400).json({ success: false, message: "Please enter all fields" })
        }

        console.log("otp : ", otp)

        // check password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password and Confirm Password" })
        }

        // check user already exist or not
        const exsistingUser = await User.findOne({ email });
        if (exsistingUser) {
            return res.status(400).json({ success: false, message: "User Already exsist" })
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recentOtp : ", recentOtp);
        console.log("recentOtp.length : ", recentOtp.length);

        if (recentOtp.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Internal error! Please try after some time."
            })
        }

        if (recentOtp[0].otp !== otp) {
            return res.status(403).json({
                success: false,
                message: "OTP mismatched, check and fill the correct otp!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10,);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })

        user.password = null;
        // send a successfull response with user data
        res.status(200)
            .json({
                success: true,
                message: "User Registered Successfully",
                user,
            })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Sign Up Failed" })
    }
}

exports.logIn = async (req, res) => {
    console.log("Inside login controller..")
    try {
        // fetch email, Password
        const { email, password } = req.body;
        // check email, password is empty or not
        if (!password || !email) {
            return res.status(403)
                .json({
                    success: false,
                    message: "please enter valid email password"
                });
        }
        // check user is registered or not
        let user = await User.findOne({ email });
        console.log("user in log in controller : ", user)
        if (!user) {
            return res.status(404)
                .json({
                    success: false,
                    message: "User not exsist, please register first",
                })
        }
        // compare user send password and stored hash password
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (isMatchedPassword) {
            // if match then create jwt token
            const payload = {
                email: user.email,
                id: user._id
            }

            const token = jwt.sign(payload, process.env.JWT_PRIVATEKEY, {
                expiresIn: "2h"
            });

            // user = user.toObject();
            user.token = token;
            user.password = null;
            // create cookie and send it
            const name = "token";
            const value = token;
            const options = {
                expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                // 4*24*60*60*1000 = 4 days
                httpOnly: true // user can't change the cookie value
            }
            let flag = true;
            res.cookie(name, value, options).status(200)
                .json({
                    success: true,
                    message: "User logged in successfully",
                    token,
                    flag,
                    user
                })

        }// if password is not matched then send a response password is not matched
        else {
            return res.status(401)
                .json({
                    success: false,
                    message: "Password is not matched, please retry"
                })
        }
    }
    catch (error) {
        console.log("Log in failed");
        console.log(error)
    }
}