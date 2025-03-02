import dotenv from "dotenv";
dotenv.config();  // Load environment variables

const configs = {
    local: {
        port: process.env.PORT || 3000,
        db: {
            dbHost: process.env.DB_HOST,
            dbName: process.env.DB_NAME || "todo_app",
            todoCollection: "todos",
            userCollection: "users"
        },
        jwtKey: process.env.JWT_KEY || "",
    },
    dev: {
        port: process.env.PORT || 3000,
        db: {
            dbHost: process.env.DB_HOST,
            dbName: process.env.DB_NAME || "todo_app",
            todoCollection: "todos",
            userCollection: "users"
        },
        jwtKey: process.env.JWT_KEY || "",
    },
};

// Ensure ENV is valid; fallback to "local" if not found
const env = (process.env.ENV || "local").toLowerCase();
export const config = configs[env] ?? configs["local"];
