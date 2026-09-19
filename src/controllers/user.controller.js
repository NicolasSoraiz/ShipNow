const userService = require("../services/user.service");

class UserController {
    async getAll(req, res) {
        try {
            const users = await userService.getAll();

            return res.status(200).json(users);
            } catch (error) {
            return res.status(500).json({
                message: "Error al obtener los usuarios"
            });
        }
    }

    async getById(req, res) {
        try {
        const { id } = req.params;

        const user = await userService.getById(id);

        if (!user) {
            return res.status(404).json({
            message: "Usuario no encontrado"
            });
        }

        return res.status(200).json(user);
        } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el usuario"
        });
    }
}

async create(req, res) {
    try {
        const user = await userService.create(req.body);

        return res.status(201).json(user);
        } catch (error) {
        return res.status(400).json({
            message: "Error al crear el usuario"
        });
    }
}
}

module.exports = new UserController();