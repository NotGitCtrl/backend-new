const district = require("../../controllers/base_tables/district");

const router = require("express").Router();

const {
  validateBaseTables,
  baseTableValidateRules,
} = require("../../validations/base-tables");
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/", district.index);
router.post(
  "/",
  baseTableValidateRules(),
  validateBaseTables,
  roleMiddleware,
  district.create
);
router.get("/:id/edit", roleMiddleware, district.edit);
router.put(
  "/:id",
  baseTableValidateRules(),
  validateBaseTables,
  roleMiddleware,
  district.update
);
router.delete("/:id", district.delete);
router.get("/:id", district.show);

module.exports = router;
