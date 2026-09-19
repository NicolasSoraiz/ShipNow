const mongoose = require("mongoose");
const env = require("./env.config");

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongodbUri);

        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;