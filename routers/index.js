const express = require("express");
const router = express.Router();

const auth = require("./auth");
const orders = require("./orders");
const api = require("./api");

router.use("/", auth);
router.use("/orders", orders);
router.use("/api", api);

module.exports = router;
