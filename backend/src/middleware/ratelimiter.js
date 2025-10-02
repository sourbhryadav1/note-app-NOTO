import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");   // can use req.ip or user id if logged in instead of a static key - to limit per user basis

        if (!success) {
            return res.status(429).json({message: "Too many requests - try again later!"});
        }

        next();
    } catch (error) {
        console.log("Error in rateLimiter middleware: ", error);
        next(error);  // to pass the error to the default express error handler
    }
}


export default rateLimiter;