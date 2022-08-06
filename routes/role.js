const role = require("../controllers/role");
const router = require("express").Router();

router.post("/", role.create);

module.exports = router;
