const router = require("express").Router();
const controllers = require("../../controllers");

router.get("/", controllers.api.auth.checkJWT, controllers.api.orders.getOrders);
router.post("/", controllers.api.auth.checkJWT, controllers.api.orders.createOrder);
router.put("/:id", controllers.api.auth.checkJWT, controllers.api.orders.editOrder);
router.delete("/:id", controllers.api.auth.checkJWT, controllers.api.orders.deleteOrder);

module.exports = router;
