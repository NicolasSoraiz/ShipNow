const productService = require("../services/product.service");

class ProductController {
    async getAll(req, res) {
        try {
        const products = await productService.getAll();

        return res.status(200).json(products);
        } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los productos"
        });
        }
    }

    async getById(req, res) {
        try {
        const { id } = req.params;

        const product = await productService.getById(id);

        if (!product) {
            return res.status(404).json({
            message: "Producto no encontrado"
            });
        }

        return res.status(200).json(product);
        } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el producto"
        });
        }
    }

    async create(req, res) {
        try {
        const product = await productService.create(req.body);

        return res.status(201).json(product);
        } catch (error) {
        return res.status(400).json({
            message: "Error al crear el producto"
        });
        }
    }
}

module.exports = new ProductController();