exports.sendOTPVerification = (name, otp) => {
    return `<!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>OTP Verification - TalkTime</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }

            .header {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .body {
                font-size: 18px;
                margin-bottom: 20px;
            }

            .otp {
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                padding: 10px 20px;
                background-color: #e0f7fa;
                border-radius: 4px;
                display: inline-block;
                letter-spacing: 2px;
            }

            .footer {
                font-size: 14px;
                color: #999;
                margin-top: 20px;
            }

            .support {
                font-size: 14px;
                color: #007bff;
                text-decoration: none;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <img class="logo" src="https://i.ibb.co/sCk8HZX/logo.png" alt="TalkTime Logo">
            <div class="header">OTP Verification</div>
            <div class="body">
                <p>Hi ${name},</p>
                <p>Thank you for registering with TalkTime! To complete your registration, please use the following OTP
                    (One-Time Password) to verify your email address:</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for the next 10 minutes.</p>
                <p>If you did not request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>If you have any questions or need assistance, please reach out to our support team at
                    <a class="support" href="mailto:support@talktime.com">support@talktime.com</a>.
                </p>
                <p>Thank you for choosing TalkTime!</p>
            </div>
        </div>
    </body>

    </html>`;
};
