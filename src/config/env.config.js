const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({ path: envFile });

const requiredEnvVariables = ["PORT", "MONGODB_URI", "NODE_ENV"];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno: ${variable}`);
    }
}

const env = {
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV
};

module.exports = env;