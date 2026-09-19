const productRepository = require("../repositories/product.repository");
const { PRODUCT_STATUS } = require("../constants");

class ProductService {
    async getAll() {
        const products = await productRepository.getAll();

        return products.filter((product) => product.stock > 0);
    }

    async getById(id) {
        return productRepository.getById(id);
    }

    async create(data) {
        const productData = {
        ...data,
        status: PRODUCT_STATUS.AVAILABLE
        };

        return productRepository.create(productData);
    }
}

module.exports = new ProductService();