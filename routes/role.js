const role = require("../controllers/role");
const router = require("express").Router();

router.post("/addrole", role.create);

module.exports = router;
