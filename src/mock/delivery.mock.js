const { DELIVERY_STATUS } = require("../constants");

const generateDelivery = ({ orderId, driverId }) => {
    return {
        order: orderId,
        driver: driverId,
        status: DELIVERY_STATUS.PENDING,
        deliveredAt: null
    };
};

const generateDeliveries = ({ qty = 1, orderIds, driverIds }) => {
    if (!orderIds || orderIds.length === 0) {
        throw new Error("Se necesita al menos un pedido para generar entregas");
    }

    if (!driverIds || driverIds.length === 0) {
        throw new Error("Se necesita al menos un repartidor para generar entregas");
    }

    return Array.from({ length: qty }, (_, index) => {
        const orderId = orderIds[index % orderIds.length];
        const driverId = driverIds[index % driverIds.length];

        return generateDelivery({
            orderId,
            driverId
        });
    });
};

module.exports = {
    generateDelivery,
    generateDeliveries
};