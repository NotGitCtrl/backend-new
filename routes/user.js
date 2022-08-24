const user = require("../controllers/user");

const router = require("express").Router();

router.post("/list", user.getUserAccToRole);
// router.get("/users", user.show);

module.exports = router;
