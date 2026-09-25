const {
    ORDER_STATUS,
    ORDER_PRIORITY
} = require("../constants");

const generateOrder = ({ userId, productId }) => {
    const quantity = Math.floor(Math.random() * 3) + 1;

    return {
        user: userId,
        items: [
            {
                product: productId,
                quantity
            }
        ],
        status: ORDER_STATUS.PENDING,
        priority: ORDER_PRIORITY.MEDIUM,
        total: quantity * 10000
    };
};

const generateOrders = ({ qty = 1, userIds, productIds }) => {
    if (!userIds || userIds.length === 0) {
        throw new Error("Se necesita al menos un usuario para generar pedidos");
    }

    if (!productIds || productIds.length === 0) {
        throw new Error("Se necesita al menos un producto para generar pedidos");
    }

    return Array.from({ length: qty }, (_, index) => {
        const userId = userIds[index % userIds.length];
        const productId = productIds[index % productIds.length];

        return generateOrder({
            userId,
            productId
        });
    });
};

module.exports = {
    generateOrder,
    generateOrders
};