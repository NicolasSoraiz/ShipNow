const express = require("express");
const mockController = require("../controllers/mock.controller");
const router = express.Router();

router.get("/users", mockController.getUsers);
router.get("/drivers", mockController.getDrivers);
router.get("/orders", mockController.getOrders);
router.get("/deliveries", mockController.getDeliveries);
router.post("/seed", mockController.seed);

module.exports = router;