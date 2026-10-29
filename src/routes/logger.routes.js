const express = require("express");
const loggerController = require("../controllers/logger.controller");

const router = express.Router();

/**
 * @swagger
 * /api/logger/test:
 *   get:
 *     summary: Probar los niveles de logging
 *     description: Ejecuta una prueba de los niveles de registro configurados. Es una herramienta de validación técnica, no una operación de negocio.
 *     tags: [Logger]
 *     responses:
 *       200:
 *         description: Prueba de logging ejecutada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Error interno durante la prueba
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get("/test", (req, res, next) => {
    try {
        return loggerController.testLogs(req, res);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;