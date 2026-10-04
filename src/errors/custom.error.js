class CustomError extends Error {
    constructor(message, code, statusCode) {
        super(message);

        this.name = "CustomError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;