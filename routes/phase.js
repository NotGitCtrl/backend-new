const phase = require("../controllers/phase");

const router = require("express").Router();
const roleMiddleware = require("../middleware/roleMiddleware");

// const { validateHei, heiValidateRules } = require("../validations/base-tables");

router.get("/:id/list", phase.index);
router.post("/", roleMiddleware, phase.create);
router.get("/:id/edit", roleMiddleware, phase.edit);
router.put("/:id", roleMiddleware, phase.update);
router.delete("/:id", phase.delete);
router.get("/:id", phase.show);

module.exports = router;
