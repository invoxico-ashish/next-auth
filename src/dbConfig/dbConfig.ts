import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("db is connected");
        });
        connection.on("error", (err) => {
            console.log(err);
            process.exit(1);
        })
    } catch (error) {
        console.log(error)
    }
};