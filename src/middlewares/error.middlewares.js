const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");
const logger = require("../config/logger");

const errorMiddleware = (error, req, res, next) => {
    const requestInfo = `${req.method} ${req.originalUrl}`;

    if (
        error.name === "ValidationError" ||
        error.name === "CastError" ||
        error.code === 11000
    ) {
        const invalidDataError = ERROR_DICTIONARY.INVALID_DATA;

        logger.warning(
            `[${requestInfo}] INVALID_DATA: ${error.message}`
        );

        return res.status(invalidDataError.statusCode).json({
            status: "error",
            code: "INVALID_DATA",
            message: invalidDataError.message
        });
    }

    if (error instanceof CustomError) {
        if (error.statusCode >= 500) {
            logger.error(
                `[${requestInfo}] ${error.code}: ${error.message}`
            );
        } else {
            logger.warning(
                `[${requestInfo}] ${error.code}: ${error.message}`
            );
        }

        return res.status(error.statusCode).json({
            status: "error",
            code: error.code,
            message: error.message
        });
    }

    logger.error(
        `[${requestInfo}] Error inesperado: ${error.stack || error.message}`
    );

    return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error interno en el servidor"
    });
};

module.exports = errorMiddleware;