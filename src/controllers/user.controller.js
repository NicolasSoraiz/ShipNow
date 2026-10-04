const userService = require("../services/user.service");

class UserController {
    async getAll(req, res, next) {
        try {
            const users = await userService.getAll();

            return res.status(200).json(users);
        } catch (error) {
            return next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(id);

            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const user = await userService.create(req.body);

            return res.status(201).json(user);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new UserController();