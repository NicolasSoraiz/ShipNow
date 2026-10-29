const express = require("express");
const mockController = require("../controllers/mock.controller");
const router = express.Router();

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Generar usuarios simulados
 *     description: Genera usuarios ficticios para pruebas. No los guarda en la base de datos.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios que se generarán.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 2
 *     responses:
 *       200:
 *         description: Usuarios simulados generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida
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
router.get("/users", mockController.getUsers);

/**
 * @swagger
 * /api/mocks/drivers:
 *   get:
 *     summary: Generar conductores simulados
 *     description: Genera conductores ficticios para pruebas.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de conductores que se generarán.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 2
 *     responses:
 *       200:
 *         description: Conductores simulados generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida
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
router.get("/drivers", mockController.getDrivers);

/**
 * @swagger
 * /api/mocks/orders:
 *   get:
 *     summary: Generar pedidos simulados
 *     description: Genera pedidos ficticios para pruebas sin guardarlos en la base de datos.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de pedidos que se generarán.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 2
 *     responses:
 *       200:
 *         description: Pedidos simulados generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cantidad inválida
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
router.get("/orders", mockController.getOrders);

/**
 * @swagger
 * /api/mocks/deliveries:
 *   get:
 *     summary: Generar entregas simuladas
 *     description: Genera entregas ficticias para pruebas.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de entregas que se generarán.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 2
 *     responses:
 *       200:
 *         description: Entregas simuladas generadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Cantidad inválida
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
router.get("/deliveries", mockController.getDeliveries);

/**
 * @swagger
 * /api/mocks/seed:
 *   post:
 *     summary: Cargar datos de prueba en la base de datos
 *     description: Genera y guarda datos relacionados para pruebas.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de registros de prueba que se generarán.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 10
 *     responses:
 *       201:
 *         description: Datos de prueba cargados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Datos de prueba cargados correctamente
 *                 cantidad:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: object
 *                   description: Datos generados y guardados por el servicio.
 *       400:
 *         description: Cantidad inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al cargar los datos de prueba
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/seed", mockController.seed);

module.exports = router;