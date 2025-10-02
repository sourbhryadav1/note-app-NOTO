import express from "express";  // if type is module in package.json
// const express = require("express")  // if type is common js in package.json

import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";



dotenv.config()
const app = express();
const PORT = process.env.PORT || 5001


// Middleware
app.use(cors({
    origin: "http://localhost:5173"   // frontend url,
}))
app.use(express.json())   // this is to parse the incoming json data from the req body to use as {title, content} = req.body otherwise req.body will be undefined
app.use(rateLimiter);  // to check the rate limit for each request


// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method : ${req.method} | Req URL : ${req.url} | Time : ${new Date().toISOString()}`);
//     next();
// })

app.use("/api/notes", notesRoutes)
// instead of coding the whole api points in a single file - we make routes, we can use them as above and we can pre assign the default starting of each get post method which was /api/notes -> it will automatically be joind ahead of every req from notesRoutes


// Endpoint -> combination of a URL + HTTP method that lets the client interact with a specific resource.


// always connect to DB first and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT)
    });
})
