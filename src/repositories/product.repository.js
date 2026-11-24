const Product = require("../models/product");

class ProductRepository {
    async getAll(page = 1, limit = 10) {
        const filter = { stock: { $gt: 0 } };

        const [products, total] = await Promise.all([
            Product.find(
                filter,
                {
                    name: 1,
                    description: 1,
                    price: 1,
                    stock: 1,
                    status: 1
                }
            )
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),

            Product.countDocuments(filter)
        ]);

        return {
            data: products,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        };
    }

    async getById(id) {
        return Product.findById(id);
    }

    async create(data) {
        return Product.create(data);
    }
}

module.exports = new ProductRepository();