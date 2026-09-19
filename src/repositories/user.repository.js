const User = require("../models/User");

class UserRepository {
    async getAll() {
        return User.find(
        {},
        {
            name: 1,
            email: 1,
            role: 1
        }
        ).sort({ createdAt: -1 });
    }

    async getById(id) {
        return User.findById(id);
    }

    async create(data) {
        return User.create(data);
    }
}

module.exports = new UserRepository();