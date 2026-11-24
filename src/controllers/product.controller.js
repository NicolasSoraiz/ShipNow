const productService = require("../services/product.service");

class ProductController {
    async getAll(req, res, next) {
        try {
            const page = Math.max(1, parseInt(req.query.page) || 1);
            const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

            const result = await productService.getAll(page, limit);

            return res.status(200).json({
                status: "success",
                results: result.data.length,
                pagination: {
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages
                },
                data: result.data
            });
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