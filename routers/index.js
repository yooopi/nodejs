const express = require("express");
const router = express.Router();

const auth = require("./auth");
const orders = require("./orders");

router.use("/", auth);
router.use("/orders", orders);

module.exports = router;
