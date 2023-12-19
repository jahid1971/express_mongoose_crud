import config from "./config";
import app from "./app";
import mongoose from "mongoose";


async function server() {
    try {
        await mongoose.connect("mongodb+srv://admin_um:admin12345@cluster0.wc2bte6.mongodb.net/mongoose-express-crud-assign2?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log(`Example app listening on port 5000`);
        });
    } catch (error) {
        console.log(error);
    }
}

server().catch((err) => console.log(err, "......server error....."));
