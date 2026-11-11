const userRepository = require("../repositories/user.repository");
const { ROLES } = require("../constants");
const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");
const fs = require("fs/promises");
const logger = require("../config/logger");

const ALLOWED_DOCUMENT_TYPES = ["DNI", "LICENSE", "OTHER"];

class UserService {
    async getAll() {
        return userRepository.getAll();
    }

    async getUserById(id) {
        const user = await userRepository.getById(id);

        if (!user) {
            const error = ERROR_DICTIONARY.USER_NOT_FOUND;

            throw new CustomError(
                error.message,
                "USER_NOT_FOUND",
                error.statusCode
            );
        }

        return user;
    }

    async create(data) {
        const userData = {
            ...data,
            role: data.role || ROLES.USER
        };

        return userRepository.create(userData);
    }


    async addDocument(userId, file, documentType) {
        try {
            if (!file) {
                const error = ERROR_DICTIONARY.FILE_REQUIRED;

                throw new CustomError(
                    error.message,
                    "FILE_REQUIRED",
                    error.statusCode
                );
            }

            if (!ALLOWED_DOCUMENT_TYPES.includes(documentType)) {
                const error = ERROR_DICTIONARY.INVALID_DOCUMENT_TYPE;

                throw new CustomError(
                    error.message,
                    "INVALID_DOCUMENT_TYPE",
                    error.statusCode
                );
            }

            await this.getUserById(userId);

            const documentData = {
                originalName: file.originalname,
                filename: file.filename,
                path: `uploads/users/${file.filename}`,
                mimetype: file.mimetype,
                size: file.size,
                documentType,
                uploadedAt: new Date()
            };

            const updatedUser = await userRepository.addDocument(
                userId,
                documentData
            );

            logger.info(
                `[UPLOAD] Documento ${documentType} cargado correctamente para el usuario ${userId}`
            );

            return updatedUser;

        } catch (error) {
            if (file?.path) {
                try {
                    await fs.unlink(file.path);
                } catch (cleanupError) {
                    if (cleanupError.code !== "ENOENT") {
                        throw cleanupError;
                    }
                }
            }
            throw error;
        }
    }
}

module.exports = new UserService();