const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", (req, res) => {
  res.redirect("/signin");
});

router.get("/signin", controllers.auth.getSignin);
router.post("/signin", controllers.auth.postSignin);

router.get("/signup", controllers.auth.getSignup);
router.post("/signup", controllers.auth.postSignup);

router.post("/signout", controllers.auth.postSignout);

module.exports = router;
