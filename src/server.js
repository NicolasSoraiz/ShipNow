const env = require("./config/env.config");
const connectDB = require("./config/database");
const app = require("./app");
const logger = require("./config/logger");

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.port, () => {
            logger.info(`Servidor escuchando en el puerto ${env.port}`);
        });
    } catch (error) {
        logger.fatal(`No se pudo iniciar ShipNow: ${error.message}`);
        process.exit(1);
    }
};

startServer();