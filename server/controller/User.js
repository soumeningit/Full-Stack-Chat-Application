const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const { contactUsEmail } = require("../mailTemplates/contactFormRes");
const mailSender = require("../utils/mailSender")


exports.updateUser = async (req, res) => {
    try {

        console.log("inside update user inside server....");

        const userId = req?.user?.id;
        const img = req.files.image;
        console.log("image : ", img);
        console.log("userId : ", userId)

        if (!userId || !img) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Invalid request"
                });
        }

        const verifyUser = await User.findById(userId);
        console.log("verifyUser : ", verifyUser);
        if (!verifyUser) {
            return res.status(404)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        require("dotenv").config();

        const uploadDetails = await uploadFileToCloudinary(img, process.env.FOLDER_NAME);

        const updateUserDetails = await User.findByIdAndUpdate({
            _id: userId
        },
            {
                $set: {
                    image: uploadDetails.secure_url,
                }
            },
            {
                new: true
            });

        console.log("updateUserDetails : ", updateUserDetails);
        updateUserDetails.password = null;
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateUserDetails
        });



    } catch (error) {
        console.log("Error in update user");
        return res.status(500)
            .json({
                success: false,
                message: "Error in update!"
            })
    }
}

exports.contactUs = async (req, res) => {
    try {
        // fetch the data
        const { name, email, message } = req.body;
        // validate the data
        if (!name || !email || !message) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please fill all the fields."
                });
        }

        // send the mail to the nucleus
        const mailResponse = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(name, email, message),
        )
        console.log("Email Res ", mailResponse)

        require("dotenv").config();

        const adminMail = await mailSender(
            process.env.ADMIN_MAIL,
            "User Send Mail",
            `User: ${name} \nEmail: ${email}  \nMessage: ${message}`,
        )

        console.log("adminMail Email Res ", adminMail)
        // console.log("Failed")


        return res.json({
            success: true,
            message: "Email send successfully",
        })

    } catch (error) {
        console.log("We can't contact you right now please try after some time");
        console.log(error);
    }
}