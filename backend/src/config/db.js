import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            console.error("MongoDB URI missing: set MONGODB_URI or MONGO_URI env variable.");
            process.exit(1);
        }
        await mongoose.connect(uri);

        console.log("Mongo connected!");

    } catch (error) {
        console.log("Error connecting MongoDb", error);
        process.exit(1) // 1 - exit with failure
    }
};