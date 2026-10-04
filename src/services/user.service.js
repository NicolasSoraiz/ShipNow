const userRepository = require("../repositories/user.repository");
const { ROLES } = require("../constants");
const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");

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
}

module.exports = new UserService();