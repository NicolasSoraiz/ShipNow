const orderRepository = require("../repositories/order.repository");
const userRepository = require("../repositories/user.repository");
const productRepository = require("../repositories/product.repository");
const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");
const { ORDER_STATUS, ORDER_PRIORITY } = require("../constants");

class OrderService {

    async getAll() {
        return orderRepository.getAll();
    }

    async getById(id) {
        const order = await orderRepository.getById(id);

        if (!order) {
            throw new CustomError(
                "Pedido no encontrado",
                "ORDER_NOT_FOUND",
                404
            );
        }

        return order;
    }

    async create(data) {
        const user = await userRepository.getById(data.user);

        if (!user) {
            throw new CustomError(
                "Usuario no encontrado",
                "USER_NOT_FOUND",
                404
            );
        }

        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw new CustomError(
                "El pedido debe contener al menos un producto",
                "INVALID_ORDER_ITEMS",
                400
            );
        }

        let total = 0;

        for (const item of data.items) {
            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                throw new CustomError(
                    "La cantidad debe ser un número entero mayor que 0",
                    "INVALID_ORDER_QUANTITY",
                    400
                );
            }

            const product = await productRepository.getById(item.product);

            if (!product) {
                throw new CustomError(
                    "Producto no encontrado",
                    "PRODUCT_NOT_FOUND",
                    404
                );
            }

            if (product.stock < item.quantity) {
                throw new CustomError(
                    "Stock insuficiente para el producto solicitado",
                    "INSUFFICIENT_STOCK",
                    400
                );
            }

            total += product.price * item.quantity;
        }

        const orderData = {
            ...data,
            total,
            status: ORDER_STATUS.PENDING,
            priority: data.priority || ORDER_PRIORITY.MEDIUM
        };

        return orderRepository.create(orderData);
    }
}

module.exports = new OrderService();