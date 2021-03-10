const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.orders.getOrders);
router.post("/create", controllers.orders.createOrder);
router.post("/:id/edit", controllers.orders.editOrder);
router.post("/:id/delete", controllers.orders.deleteOrder);

module.exports = router;
