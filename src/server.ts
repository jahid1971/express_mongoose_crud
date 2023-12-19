import config from "./config";
import app from "./app";
import mongoose from "mongoose";


async function server() {
    try {
<<<<<<< HEAD
        await mongoose.connect("mongodb+srv://admin_um:admin12345@cluster0.wc2bte6.mongodb.net/mongoose-express-crud-assign2?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log(`Example app listening on port 5000`);
=======
        await mongoose.connect(`${config.database_url_local}`);
        console.log("Connected to MongoDB");
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${process.env.PORT}`);
>>>>>>> 938d7799da11f144676b4e2f607ad9aeb1c90fa8
        });
    } catch (error) {
        console.log(error);
    }
}

server().catch((err) => console.log(err, "......server error....."));
