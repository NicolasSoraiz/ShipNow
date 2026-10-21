const express = require("express");
const loggerController = require("../controllers/logger.controller");

const router = express.Router();

router.get("/test", (req, res, next) => {
    try {
        return loggerController.testLogs(req, res);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
