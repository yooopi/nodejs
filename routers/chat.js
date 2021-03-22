const router = require("express").Router();
const controllers = require("../controllers");

router.get("/", controllers.chat.getChats);
router.get("/:id", controllers.chat.getChatById);
router.post("/create", controllers.chat.postChat);

module.exports = router;
