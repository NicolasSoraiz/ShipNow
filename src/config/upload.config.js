const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const CustomError = require("../errors/custom.error");

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png"
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "receipts";

        if (req.baseUrl.includes("users")) {
            folder = "users";
        }

        const destination = path.join(UPLOAD_DIR, folder);

        fs.mkdirSync(destination, { recursive: true });

        cb(null, destination);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${crypto.randomUUID()}${extension}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        req.fileValidationError = true;

        return cb(
            new CustomError(
                "El tipo de archivo no está permitido",
                "INVALID_FILE_TYPE",
                400
            )
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: 1
    }
});

module.exports = {
    upload,
    MAX_FILE_SIZE,
    ALLOWED_MIME_TYPES
};