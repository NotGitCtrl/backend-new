const country = require("../../controllers/base_tables/country");

const router = require("express").Router();
const {
  validateBaseTables,
  baseTableValidateRules,
} = require("../../validations/base-tables");
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/", country.index);
router.post(
  "/",
  baseTableValidateRules(),
  validateBaseTables,
  roleMiddleware,
  country.create
);
router.get("/:id/edit", roleMiddleware, country.edit);
router.put(
  "/:id",
  baseTableValidateRules(),
  validateBaseTables,
  roleMiddleware,
  country.update
);
// router.delete("/:id", country.delete);
router.get("/:id", roleMiddleware, country.show);

module.exports = router;
