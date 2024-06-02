import mongoose from "mongoose";

let isConnected = false;

if (isConnected) {
    console.log("MongoDB is already connected");
    return;
}

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true ,
        });

        isConnected = true;
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}
