import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Mongo connected!");

    } catch (error) {
        console.log("Error connecting MongoDb", error);
        process.exit(1) // 1 - exit with failure
    }
};