const productService = require("../services/product.service");

class ProductController {
    async getAll(req, res, next) {
        try {
            const products = await productService.getAll();

            return res.status(200).json(products);
        } catch (error) {
            return next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const product = await productService.getById(id);

            return res.status(200).json(product);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const product = await productService.create(req.body);

            return res.status(201).json(product);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ProductController();