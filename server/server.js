// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const cors = require("cors");
// const dbConnect = require('./config/database')

// const userRoute = require("./Routes/UserRoute")
// const chatRoute = require("./Routes/ChatRoute")
// const messageRoute = require("./Routes/MessageRoute")

// dotenv.config()

// const PORT = process.env.PORT || 5000;


// // dbcoonct
// dbConnect();

// // cloudinary connect

// app.use(express.json());

// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: '/tmp/',
//     })
// )
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true
//     })
// )

// app.use("/api/auth", userRoute);
// app.use("/api/chat", chatRoute);
// app.use("/api/chat/message", messageRoute)

// app.get("/", (req, res) => {
//     return res.json({
//         success: true,
//         message: "Server is running"
//     });
// })

// const server = app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

// const io = require("socket.io")(server, {
//     pingTimeout: 60000, // 60000 miliseconds === 1 min
//     cors: {
//         origin: "http://localhost:3000",
//     },
// })

// io.on("connection", (socket) => {
//     console.log("Client connected to socket.io");
//     socket.on("setup", (userData) => { //take the user data from the frontend
//         console.log("userData : ", userData)
//         socket.join(userData?._id);
//         console.log("userData._id : " + userData?._id);
//         socket.emit("connected");
//     });
//     socket.on("join chat", (room) => { // take the room id from frontend
//         // console.log("room in join : ", room)
//         socket.join(room);
//         console.log("User Joined Room: " + room);
//     });
//     // socket.on("typing", (room) => socket.in(room).emit("typing"));
//     // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageRecieved) => {
//         console.log("newMessageRecieved : ", newMessageRecieved);
//         let chat = newMessageRecieved?.data?.chat;
//         console.log("chat test : ", chat)

//         console.log("chat length : ", chat.users.length)

//         if (!chat?.users) return console.log("chat.users not defined");

//         // for sending message in group
//         chat.users.forEach((user) => {
//             console.log("user in foreach loop : ", user)
//             if (user._id === newMessageRecieved?.data?.sender?._id) return;
//             console.log("newMessageRecieved in loop : ", newMessageRecieved)
//             socket.in(user._id).emit("message received", newMessageRecieved);
//         });
//     });

// socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
// });
// })






// io.on("connection", (socket) => {
//     console.log("Connected to socket.io");
//     socket.on("setup", (userData) => {
//         socket.join(userData._id);
//         socket.emit("connected");
//     });

//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("User Joined Room: " + room);
//     });
//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;

//         if (!chat.users) return console.log("chat.users not defined");

//         chat.users.forEach((user) => {
//             if (user._id == newMessageRecieved.sender._id) return;

//             socket.in(user._id).emit("message recieved", newMessageRecieved);
//         });
//     });

//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//     });
// });







const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require('./config/database')
const fs = require("fs");
const path = require("path");

const userRoute = require("./Routes/UserRoute");
const chatRoute = require("./Routes/ChatRoute");
const messageRoute = require("./Routes/MessageRoute");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const updateUserRoute = require("./Routes/UpdateUser");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Database connection
dbConnect();
//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
)

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// );
// CORS configuration
const allowedOrigins = [
    "http://localhost:3000", // For local development
    "https://talk-time-vqvp.onrender.com"  // For Render deployment
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

cloudinaryConnect();

app.use("/api/auth", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/chat/message", messageRoute);
app.use("/api/chat", updateUserRoute);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "..", "/client/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "..", "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        return res.json({
            success: true,
            message: "Server is running",
        });
    });
}

// --------------------------deployment------------------------------

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// const io = require("socket.io")(server, {
//     // pingTimeout: 600000, // 60000 milliseconds === 1 min
//     cors: {
//         origin: ["http://localhost:3000", "https://talk-time-vqvp.onrender.com"],
//         credentials:true,
//     },
// });


// Socket.io setup
const io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:3000", "https://talk-time-vqvp.onrender.com"],
        credentials: true,
        methods: ["GET", "POST"], // Allowed HTTP methods
    },
});

io.on("connection", (socket) => {
    console.log("Client connected to socket.io");

    socket.on("setup", (userData) => {
        // console.log("userData : ", userData);
        socket.join(userData?._id);
        console.log("userData._id : " + userData?._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("upload file", (data) => {
        console.log("data in server : " + data);

        // Create the directory if it doesn't exist
        const uploadDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Create a unique filename for the uploaded file
        const fileName = path.join(uploadDir, `uploaded_file_${Date.now()}.txt`);

        // Save the file with base64 data
        fs.writeFile(fileName, data.split(',')[1], { encoding: "base64" }, (err) => {
            if (err) {
                console.error("Error writing file: ", err);
                socket.emit("upload error", { error: err.message });
                return;
            }

            const fileUrl = path.basename(fileName);
            console.log("FileName : ", fileName)
            console.log("File saved successfully");
            socket.broadcast.emit("file received", { fileName: fileName, data: data, fileUrl: fileUrl });
            socket.emit("uploaded", { fileName: fileName });
        });
    })

    socket.on("new message", (newMessageRecieved) => {
        console.log("newMessageRecieved in server : ", newMessageRecieved);

        // Check if chat is defined
        let chat = newMessageRecieved?.chat;
        if (!chat) {
            return console.log("chat not defined");
        }

        console.log("chat test : ", chat);

        // Check if chat.users is defined and is an array
        if (!Array.isArray(chat.users)) {
            return console.log("chat.users is not an array or not defined");
        }

        console.log("chat length : ", chat?.users?.length);

        // For sending message in group
        chat?.users?.forEach((user) => {
            console.log("user in foreach loop : ", user);

            // Ensure user is an object and has the required properties
            if (typeof user !== 'object' || !user?._id) {
                return console.log("user is not a valid object or does not have an _id");
            }

            if (user?._id === newMessageRecieved?.sender?._id) return;
            console.log("newMessageRecieved in loop : ", newMessageRecieved);
            socket.in(user?._id).emit("message received", newMessageRecieved);
        });
    });

    // socket.on("upload", (data) => {
    //     console.log("data in server : " + data);
    // })
});
