const User = require("../models/User")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.auth = async (req, res, next) => {
    try {

        // console.log("Request Headers: ", req.headers);
        // console.log("Request Body: ", req.body);
        // console.log("Request Cookies: ", req.cookies);

        const token = req.cookies?.token ||
            req.body?.token ||
            req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token ", token)

        // check if token is prsent or not
        if (!token) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Token is missing"
                })
        }
        // if token is present then verify the token
        try {
            console.log("verifing token..")
            const verifiedToken = jwt.verify(token, process.env.JWT_PRIVATEKEY);
            console.log("Verified Token ", verifiedToken);
            req.user = verifiedToken;
            next();
        } catch (error) {
            console.log("Invalid token")
            return res.status(408)
                .json({
                    success: false,
                    message: "Invalid token"
                })
        }

    } catch (error) {
        console.log("Something went wrong, Please try after some time")
        console.log(error)
        return res.status(403)
            .json({
                success: false,
                message: "Token validation failed!"
            })
    }

}

// One-to-One Chat