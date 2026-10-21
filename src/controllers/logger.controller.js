const logger = require("../config/logger");

class LoggerController {
    testLogs(req, res) {
        logger.debug("Prueba de nivel DEBUG");
        logger.http("Prueba de nivel HTTP");
        logger.info("Prueba de nivel INFO");
        logger.warning("Prueba de nivel WARNING");
        logger.error("Prueba de nivel ERROR");
        logger.fatal("Prueba de nivel FATAL");

        return res.status(200).json({
            status: "success",
            message: "Se registraron pruebas de todos los niveles de logging"
        });
    }
}

module.exports = new LoggerController();
