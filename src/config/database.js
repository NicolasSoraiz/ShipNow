const mongoose = require("mongoose");
const env = require("./env.config");
const logger = require("./logger");

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongodbUri);

        logger.info("Conexión a mongoDB establecida");
    } catch (error) {
        logger.fatal(`Error al conectar con MongoDB: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;