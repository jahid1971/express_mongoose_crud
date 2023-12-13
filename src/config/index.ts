import dotenv from "dotenv";
import path from "path";

try {
    dotenv.config({
        path: path.join(process.cwd(), ".env"),
    });
} catch (error: any) {
    console.error("Error loading .env file:", error.message);
}

export default {
    port: process.env.PORT,
    database_url_local: process.env.DATABASE_URL_LOCAL,
    database_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
};
