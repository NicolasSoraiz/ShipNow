const Order = require("../models/Order");

class OrderRepository {
    async getAll() {
        return Order.find()
            .populate("user", "name email")
            .populate("items.product", "name price")
            .sort({ createdAt: -1 });
    }

    async getById(id) {
        return Order.findById(id)
            .populate("user", "name email")
            .populate("items.product", "name price");
    }

    async create(data) {
        return Order.create(data);
    }
}

module.exports = new OrderRepository();