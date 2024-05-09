import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Data from "./routes/user.js";
import path from "path"; // Import path module

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

try {
    mongoose.connect(
        process.env.DATABASE
    );
    console.log("Database connected successfully!");
} catch (error) {
    console.error(`Error connecting to database: ${error}`);
}

app.use(session({
    secret: '16e8e032de4434f787ff398b2da8bfb34071f261e8332fa2cbfb5da513a106ac',
    resave: false,
    saveUninitialized: true
}))

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/css", express.static(path.join(__dirname, 'public/css'))); // Fix for __dirname
app.use("/images", express.static(path.join(__dirname, 'public/images'))); // Fix for __dirname
app.use("/js", express.static(path.join(__dirname, 'public/js'))); // Fix for __dirname

app.use(Data);

const port = 3000;
app.listen(port, () => { // Fix typo here, it should be app.listen() not app.lister()
    console.log(`Server is running on port ${port}`);
})
