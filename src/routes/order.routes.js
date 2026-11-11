const express = require("express");
const orderController = require("../controllers/order.controller");
const { upload } = require("../config/upload.config");

const router = express.Router();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);

/**
 * @swagger
 * /api/orders/{id}/receipts:
 *   post:
 *     summary: Cargar un comprobante de un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador MongoDB del pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - receipt
 *             properties:
 *               receipt:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF, JPG o PNG (máximo 5 MB)
 *     responses:
 *       200:
 *         description: Comprobante cargado correctamente
 *       400:
 *         description: Archivo faltante, tipo inválido o tamaño excedido
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    "/:id/receipts",
    upload.single("receipt"),
    orderController.uploadReceipt
);

module.exports = router;