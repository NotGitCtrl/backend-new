const hei = require("../controllers/hei");

const router = require("express").Router();

const { validateHei, heiValidateRules } = require("../validations/base-tables");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", hei.index);
router.post("/", heiValidateRules(), validateHei, roleMiddleware, hei.create);
router.get("/:id/edit", roleMiddleware, hei.edit);
router.put("/:id", heiValidateRules(), validateHei, roleMiddleware, hei.update);
router.delete("/:id", hei.delete);
router.get("/:id", hei.show);

module.exports = router;
