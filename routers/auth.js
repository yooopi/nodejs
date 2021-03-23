const router = require("express").Router();
const passport = require("passport");
const controllers = require("../controllers");

router.get("/", (req, res) => {
  res.redirect("/signin");
});

router.get(
  "/signin/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/signin/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signup",
  }),
  controllers.auth.googleSignin
);

router.get("/signin", controllers.auth.getSignin);
router.post("/signin", controllers.auth.postSignin);

router.get("/signup", controllers.auth.getSignup);
router.post("/signup", controllers.auth.postSignup);

router.post("/signout", controllers.auth.postSignout);

module.exports = router;
