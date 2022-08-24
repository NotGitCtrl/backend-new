const user = require("../controllers/user");

const router = require("express").Router();
const roleMiddleware = require("../../middleware/roleMiddleware");
router.post("/list", roleMiddleware, user.getUserAccToRole);
// router.get("/users", user.show);

module.exports = router;
