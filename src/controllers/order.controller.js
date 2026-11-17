const orderService = require("../services/order.service");

class OrderController {
    async getAll(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

            const result = await orderService.getAll(page, limit);

            res.status(200).json({
                status: "success",
                results: result.orders.length,
                pagination: {
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages,
                    totalResults: result.totalResults
                },
                data: result.orders
            });
        } catch (error) {
            next(error);
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