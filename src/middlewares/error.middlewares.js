const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");

const errorMiddleware = (error, req, res, next) => {
    console.error(error);

    if (error.name === "ValidationError") {
        const validationError = ERROR_DICTIONARY.INVALID_DATA;

        return res.status(validationError.statusCode).json({
            status: "error",
            code: "INVALID_DATA",
            message: validationError.message
        });
    }

    if (error.name === "CastError") {
        const invalidDataError = ERROR_DICTIONARY.INVALID_DATA;

        return res.status(invalidDataError.statusCode).json({
            status: "error",
            code: "INVALID_DATA",
            message: invalidDataError.message
        });
    }

    if (error.code === 11000) {
        const duplicateError = ERROR_DICTIONARY.INVALID_DATA;

        return res.status(duplicateError.statusCode).json({
            status: "error",
            code: "INVALID_DATA",
            message: duplicateError.message
        });
    }

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            status: "error",
            code: error.code,
            message: error.message
        });
    }

    return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocurrió un error interno en el servidor"
    });
};

module.exports = errorMiddleware;