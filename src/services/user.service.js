const userRepository = require("../repositories/user.repository");
const { ROLES } = require("../constants");

class UserService {
    async getAll() {
        return userRepository.getAll();
    }

    async getById(id) {
        return userRepository.getById(id);
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