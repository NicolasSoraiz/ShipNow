const Order = require("../models/Order");

class OrderRepository {
    async getAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [orders, totalResults] = await Promise.all([
            Order.find()
                .populate("user", "name email")
                .populate("items.product", "name price")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Order.countDocuments()
        ]);

        return {
            orders,
            totalResults,
            page,
            limit,
            totalPages: Math.ceil(totalResults / limit)
        };
    }

    async getById(id) {
        return Order.findById(id)
            .populate("user", "name email")
            .populate("items.product", "name price");
    }

    async create(data) {
        return Order.create(data);
    }

    async addReceipt(orderId, receiptData) {
        return Order.findByIdAndUpdate(
            orderId,
            { $push: { receipts: receiptData } },
            { new: true, runValidators: true }
        )
            .populate("user", "name email")
            .populate("items.product", "name price");
    }
}

module.exports = new OrderRepository();