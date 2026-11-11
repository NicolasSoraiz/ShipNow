const orderService = require("../services/order.service");

class OrderController {

    async getAll(req, res, next) {
        try {
            const orders = await orderService.getAll();

            return res.status(200).json(orders);
        } catch (error) {
            return next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const order = await orderService.getById(id);

            return res.status(200).json(order);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const order = await orderService.create(req.body);

            return res.status(201).json(order);
        } catch (error) {
            return next(error);
        }
    }

    async uploadReceipt(req, res, next) {
        try {
            const { id } = req.params;

            const order = await orderService.addReceipt(
                id,
                req.file
            );

            return res.status(200).json({
                status: "success",
                message: "Comprobante cargado correctamente",
                order
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new OrderController();