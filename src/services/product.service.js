const productRepository = require("../repositories/product.repository");
const { PRODUCT_STATUS } = require("../constants");
const CustomError = require("../errors/custom.error");
const ERROR_DICTIONARY = require("../errors/error.dictionary");

class ProductService {
    async getAll() {
        const products = await productRepository.getAll();

        return products.filter((product) => product.stock > 0);
    }

    async getById(id) {
    const product = await productRepository.getById(id);

    if (!product) {
        const error = ERROR_DICTIONARY.PRODUCT_NOT_FOUND;

        throw new CustomError(
            error.message,
            "PRODUCT_NOT_FOUND",
            error.statusCode
        );
    }

    return product;
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