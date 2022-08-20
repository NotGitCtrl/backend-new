const state = require("../../controllers/base_tables/state");

const router = require("express").Router();

const {
  validateBaseTables,
  baseTableValidateRules,
} = require("../../validations/base-tables");
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/", state.index);
router.post(
  "/",
  baseTableValidateRules(),
  validateBaseTables,
  roleMiddleware,
  state.create
);
router.get("/:id/edit", roleMiddleware, state.edit);
router.put(
  "/:id",
  baseTableValidateRules(),
  validateBaseTables,
  roleMiddleware,
  state.update
);
router.delete("/:id", state.delete);
router.get("/:id", state.show);

module.exports = router;
