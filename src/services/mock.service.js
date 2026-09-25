const crypto = require("crypto");
const mockRepository = require("../repositories/mock.repository");
const { generateUsers } = require("../mock/user.mock");
const { generateDrivers } = require("../mock/driver.mock");
const { generateOrders } = require("../mock/order.mock");
const { generateDeliveries } = require("../mock/delivery.mock");
const { PRODUCT_STATUS } = require("../constants");

class MockService {
    generateUsers(qty = 1) {
        return generateUsers(qty);
    }

    generateDrivers(qty = 1) {
        return generateDrivers(qty);
    }

    generateMockIds(qty) {
        return Array.from(
            { length: qty },
            () => crypto.randomBytes(12).toString("hex")
        );
    }

    generateOrders(qty = 1) {
        const userIds = this.generateMockIds(qty);
        const productIds = this.generateMockIds(qty);

        return generateOrders({
            qty,
            userIds,
            productIds
        });
    }

    generateDeliveries(qty = 1) {
        const orderIds = this.generateMockIds(qty);
        const driverIds = this.generateMockIds(qty);

        return generateDeliveries({
            qty,
            orderIds,
            driverIds
        });
    }

    async seed(qty = 1) {
        const users = generateUsers(qty);
        const drivers = generateDrivers(qty);

        const createdUsers = await mockRepository.createUsers(users);
        const createdDrivers = await mockRepository.createUsers(drivers);

        const products = await mockRepository.createProducts(
            Array.from({ length: qty }, (_, index) => ({
                name: `Producto Mock ${index + 1}`,
                description: `Producto generado para pruebas ${index + 1}`,
                price: 10000,
                stock: 10,
                status: PRODUCT_STATUS.AVAILABLE
            }))
        );

        const userIds = createdUsers.map((user) => user._id);
        const productIds = products.map((product) => product._id);
        const driverIds = createdDrivers.map((driver) => driver._id);

        const orders = generateOrders({
            qty,
            userIds,
            productIds
        });

        const createdOrders = await mockRepository.createOrders(orders);

        const orderIds = createdOrders.map((order) => order._id);

        const deliveries = generateDeliveries({
            qty,
            orderIds,
            driverIds
        });

        const createdDeliveries =
            await mockRepository.createDeliveries(deliveries);

        return {
            users: createdUsers,
            drivers: createdDrivers,
            products,
            orders: createdOrders,
            deliveries: createdDeliveries
        };
    }
}

module.exports = new MockService();