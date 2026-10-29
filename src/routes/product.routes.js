const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador MongoDB del producto
 *         schema:
 *           type: string
 *         example: 671a8b2c3d4e5f60718293a4
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *       400:
 *         description: Identificador inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", productController.getById);

/**
 * @swagger
* /api/products:
 *   post:
 *     summary: Crear un producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: Paquete estándar
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *                 example: Envío de paquete mediano
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Precio del producto.
 *                 example: 1500
 *               stock:
 *                 type: number
 *                 minimum: 0
 *                 description: Cantidad disponible en stock.
 *                 example: 20
 *               status:
 *                 type: string
 *                 description: Estado del producto. Si se omite, se asigna AVAILABLE por defecto.
 *                 example: AVAILABLE
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post("/", productController.create);

module.exports = router;