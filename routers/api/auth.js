const router = require("express").Router();
const controllers = require("../../controllers");

router.post("/signin", controllers.api.auth.postSignin);
router.post("/signup", controllers.api.auth.postSignup);

module.exports = router;
