import config from "./config";
import app from "./app";
import mongoose from "mongoose";


async function server() {
    try {
        await mongoose.connect(`${config.database_url_local}`);
        console.log("Connected to MongoDB");
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

server().catch((err) => console.log(err, "......server error....."));
