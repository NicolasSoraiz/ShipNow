const ROLES = Object.freeze({
    ADMIN: "ADMIN",
    USER: "USER",
    DRIVER: "DRIVER"
});

const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: "AVAILABLE",
    OUT_OF_STOCK: "OUT_OF_STOCK"
});

const ORDER_STATUS = Object.freeze({
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    IN_TRANSIT: "IN_TRANSIT",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED"
});

const ORDER_PRIORITY = Object.freeze({
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
});

const DELIVERY_STATUS = Object.freeze({
    PENDING: "PENDING",
    ASSIGNED: "ASSIGNED",
    IN_TRANSIT: "IN_TRANSIT",
    DELIVERED: "DELIVERED"
});

module.exports = {
    ROLES,
    PRODUCT_STATUS,
    ORDER_STATUS,
    ORDER_PRIORITY,
    DELIVERY_STATUS
};