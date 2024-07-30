const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")
const { sendOTPVerification } = require("../mailTemplates/OTPVerification")

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expired: 5 * 60
    },
    name: {
        type: String,
        select: false,
    }
});

async function sendVerificationMail(email, otp, name) {
    try {
        console.log("inside sendVerificationMail " + "email " + email + " otp ", otp, "name : ", name)
        const mail = mailSender(email, "Verification mail send from TalkTime", sendOTPVerification(name, otp));
        console.log("Mail send succsessfully", mail);
    } catch (error) {
        console.log("Sending verification mail failed!");
        console.log(error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    if (this.isNew) {
        await sendVerificationMail(this.email, this.otp, this.name);
    }
    next();
})

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;