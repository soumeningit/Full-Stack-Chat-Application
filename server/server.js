const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require('./config/database')

const userRoute = require("./Routes/UserRoute")
const chatRoute = require("./Routes/ChatRoute")

dotenv.config()

const PORT = process.env.PORT || 5000;


// dbcoonct
dbConnect();

// cloudinary connect

app.use(express.json());

// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: '/tmp/',
//     })
// )
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

app.use("/api/auth", userRoute);
app.use("/api/chat", chatRoute);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is running"
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})