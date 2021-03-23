const router = require("express").Router();
const cors = require("cors");
const corsOptions = require("../../configs/cors");

const auth = require("./auth");
const orders = require("./orders");

// На auth нет смысла навешивать options, т.к. там только GET и POST
router.options("/v1/orders", cors(corsOptions));
router.use("/v1", cors(corsOptions), auth);
router.use("/v1/orders", cors(corsOptions), orders);

module.exports = router;
