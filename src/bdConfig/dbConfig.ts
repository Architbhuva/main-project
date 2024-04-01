import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("mongoDB Connected");
        })

        connection.on('error', (err) => {
            console.log("mongoDB connection Error, please make sure db is up and running:" + err);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong in connecting to db");
        console.log(error);
    }
}