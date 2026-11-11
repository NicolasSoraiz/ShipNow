const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");
const logger = require("../config/logger");

const errorMiddleware = (error, req, res, next) => {
    const requestInfo = `${req.method} ${req.originalUrl}`;

    // Errores de Multer
    if (error.name === "MulterError") {
        let errorCode = "FILE_UPLOAD_ERROR";

        if (error.code === "LIMIT_FILE_SIZE") {
            errorCode = "FILE_TOO_LARGE";
        }

        if (
            error.code === "LIMIT_UNEXPECTED_FILE" ||
            error.code === "LIMIT_FILE_COUNT"
        ) {
            errorCode = "INVALID_DATA";
        }

        const uploadError = ERROR_DICTIONARY[errorCode];

        logger.warning(
            `[${requestInfo}] ${errorCode}: ${error.message}`
        );

        return res.status(uploadError.statusCode).json({
            status: "error",
            code: errorCode,
            message: uploadError.message
        });
    }

    // Errores de validación de Mongoose
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

    // Errores personalizados
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

    // Errores inesperados
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