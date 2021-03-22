const express = require("express");
const router = express.Router();

const auth = require("./auth");
const orders = require("./orders");
const chat = require("./chat");
const api = require("./api");

router.use("/", auth);
router.use("/orders", orders);
router.use("/chats", chat);
router.use("/api", api);

module.exports = router;
