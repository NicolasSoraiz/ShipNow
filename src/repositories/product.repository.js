const Product = require("../models/Product");

class ProductRepository {
    async getAll() {
        return Product.find(
        {},
        {
            name: 1,
            description: 1,
            price: 1,
            stock: 1,
            status: 1
        }
        ).sort({ createdAt: -1 });
    }

    async getById(id) {
        return Product.findById(id);
    }

    async create(data) {
        return Product.create(data);
    }
}

module.exports = new ProductRepository();