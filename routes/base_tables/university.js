const university = require("../../controllers/base_tables/university");

const router = require("express").Router();

const {
  validateUniversities,
  universityValidateRules,
} = require("../../validations/base-tables");
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/", university.index);
router.post(
  "/",
  universityValidateRules(),
  validateUniversities,
  roleMiddleware,
  university.create
);
router.get("/:id/edit", roleMiddleware, university.edit);
router.put(
  "/:id",
  universityValidateRules(),
  validateUniversities,
  roleMiddleware,
  university.update
);
router.delete("/:id", university.delete);
router.get("/:id", university.show);

module.exports = router;
