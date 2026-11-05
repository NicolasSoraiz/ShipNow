const express = require("express");
const orderController = require("../controllers/order.controller");

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", orderController.getAll);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador MongoDB del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido obtenido correctamente
 *       400:
 *         description: Identificador inválido
 *       404:
 *         description: Pedido no encontrado
 */
router.get("/:id", orderController.getById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - items
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID del usuario
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario o producto no encontrado
 */
router.post("/", orderController.create);

module.exports = router;