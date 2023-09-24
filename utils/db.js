import mongoose from "mongoose";

export const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        throw new Error("Connecvtion failed");
        // process.exit(1);
    }
}