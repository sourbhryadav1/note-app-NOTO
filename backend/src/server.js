import express from "express";  // if type is module in package.json
// const express = require("express")  // if type is common js in package.json
import path from "path"

import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import helmet from "helmet";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";



dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();  // to get the current directory name


// Middleware
app.use(helmet());
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json())   // this is to parse the incoming json data from the req body to use as {title, content} = req.body otherwise req.body will be undefined
app.use(rateLimiter);  // to check the rate limit for each request


// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method : ${req.method} | Req URL : ${req.url} | Time : ${new Date().toISOString()}`);
//     next();
// })

app.use("/api/notes", notesRoutes)
// instead of coding the whole api points in a single file - we make routes, we can use them as above and we can pre assign the default starting of each get post method which was /api/notes -> it will automatically be joind ahead of every req from notesRoutes

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}
else{
    app.get("/", (req, res) => {
    res.send("API is running....")  // to check if the server is running or not
    // res.json({message: "API is running...."})  // to check if the server is running or not
    })
};
// to serve the frontend - we will use the static files from the frontend build folder - dist
// and for every route that is not present on the backend - we will send the index.html file from the dist folder - so that react router can handle the routing on the frontend


// Endpoint -> combination of a URL + HTTP method that lets the client interact with a specific resource.



// always connect to DB first and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT)
    });
})
