const dotenv = require("dotenv");

const nodeEnv = process.env.NODE_ENV || "development";
const envFile = nodeEnv === "test" ? ".env.test" : ".env";

dotenv.config({ path: envFile });

const requiredEnvVariables = [
    "PORT",
    "MONGODB_URI"
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno: ${variable}`);
    }
}

const validEnvironments = ["development", "test", "production"];

if (!validEnvironments.includes(nodeEnv)) {
    throw new Error(`NODE_ENV inválido: ${nodeEnv}`);
}

const env = {
    port: Number(process.env.PORT),
    mongodbUri: process.env.MONGODB_URI,
    nodeEnv,
    logLevel: process.env.LOG_LEVEL || "info"
};

if (!Number.isInteger(env.port) || env.port <= 0 || env.port > 65535) {
    throw new Error("PORT debe ser un número entero entre 1 y 65535");
}

module.exports = env;