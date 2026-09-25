const mockService = require("../services/mock.service");

const validateQty = (value) => {
    const qty = Number(value);

    if (!Number.isInteger(qty) || qty <= 0) {
        throw new Error("qty debe ser un número entero mayor que 0");
    }

    return qty;
};

class MockController {
    async getUsers(req, res) {
        try {
            const qty = validateQty(req.query.qty || 1);

            const users = mockService.generateUsers(qty);

            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async getDrivers(req, res) {
        try {
            const qty = validateQty(req.query.qty || 1);

            const drivers = mockService.generateDrivers(qty);

            return res.status(200).json(drivers);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async getOrders(req, res) {
        try {
            const qty = validateQty(req.query.qty || 1);

            const orders = mockService.generateOrders(qty);

            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async getDeliveries(req, res) {
        try {
            const qty = validateQty(req.query.qty || 1);

            const deliveries = mockService.generateDeliveries(qty);

            return res.status(200).json(deliveries);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async seed(req, res) {
        try {
            const qty = validateQty(req.query.qty || 1);

            const result = await mockService.seed(qty);

            return res.status(201).json({
                message: "Datos de prueba cargados correctamente",
                cantidad: qty,
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error al cargar los datos de prueba",
                error: error.message
            });
        }
    }
}

module.exports = new MockController();