const User = require("../models/user");

class UserRepository {
    async getAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [users, totalResults] = await Promise.all([
            User.find()
                .select("name email role")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            User.countDocuments()
        ]);

        return {
            users,
            totalResults,
            page,
            limit,
            totalPages: Math.ceil(totalResults / limit)
        };
    }

    async getById(id) {
        return User.findById(id);
    }

    async create(data) {
        return User.create(data);
    }

    async addDocument(userId, documentData) {
        return User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    documents: documentData
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
    }
}

module.exports = new UserRepository();