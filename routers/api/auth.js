const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");

router.post("/signin", controllers.api.auth.postSignin);
router.post("/signup", controllers.api.auth.postSignup);

module.exports = router;
