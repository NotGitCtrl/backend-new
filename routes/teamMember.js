const teamMember = require("../controllers/teamMember");

const router = require("express").Router();

const { validateHei, heiValidateRules } = require("../validations/base-tables");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", teamMember.index);
router.post("/", roleMiddleware, teamMember.create);
router.get("/:id/edit", roleMiddleware, teamMember.edit);
router.put("/:id", roleMiddleware, teamMember.update);
router.delete("/:id", teamMember.delete);
router.get("/:id", teamMember.show);

module.exports = router;
