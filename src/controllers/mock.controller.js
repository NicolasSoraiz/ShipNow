const mockService = require("../services/mock.service");
const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");

const validateQty = (value) => {
    const qty = Number(value);

    if (!Number.isInteger(qty) || qty <= 0) {
        const error = ERROR_DICTIONARY.INVALID_MOCK_QUANTITY;

        throw new CustomError(
            error.message,
            "INVALID_MOCK_QUANTITY",
            error.statusCode
        );
    }

    return qty;
};

class MockController {
    async getUsers(req, res, next) {
        try {
            const qty = validateQty(req.query.qty);
            const users = await mockService.getUsers(qty);

            return res.status(200).json(users);
        } catch (error) {
            return next(error);
        }
    }

    async getDrivers(req, res, next) {
        try {
            const qty = validateQty(req.query.qty);
            const drivers = await mockService.getDrivers(qty);

            return res.status(200).json(drivers);
        } catch (error) {
            return next(error);
        }
    }

    async getOrders(req, res, next) {
        try {
            const qty = validateQty(req.query.qty);
            const orders = await mockService.getOrders(qty);

            return res.status(200).json(orders);
        } catch (error) {
            return next(error);
        }
    }

    async getDeliveries(req, res, next) {
        try {
            const qty = validateQty(req.query.qty);
            const deliveries = await mockService.getDeliveries(qty);

            return res.status(200).json(deliveries);
        } catch (error) {
            return next(error);
        }
    }

    async seed(req, res, next) {
        try {
            const qty = validateQty(req.query.qty || 1);

            const result = await mockService.seed(qty);

            return res.status(201).json({
                message: "Datos de prueba cargados correctamente",
                cantidad: qty,
                data: result
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new MockController();