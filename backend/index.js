require('dotenv').config();
const express = require('express');
const cors = require('cors');

// getdashboardmetrics
// postdashboardmetrics
// post_updates
// post_emergencies
// register
// login

// install cloudinary for files


const PORT = process.env.PORT;
const pool = require("./connection")

const app = express();
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes")


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());

pool.connect().then(()=>(console.log("DB Connected")));

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, ()=>(console.log("Server Running...")));