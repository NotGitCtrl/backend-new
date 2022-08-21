const fundingAgency = require("../controllers/fundingAgency");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = require("express").Router();

const {
  validateFundingAgency,
  fundingAgencyValidateRules,
} = require("../validations/base-tables");

// START - Super Admin / UGC Routes
router.get("/", fundingAgency.index);
router.post(
  "/",
  fundingAgencyValidateRules(),
  validateFundingAgency,
  roleMiddleware,
  fundingAgency.create
);
router.get("/:id/edit", roleMiddleware, fundingAgency.edit);
router.put(
  "/:id",
  fundingAgencyValidateRules(),
  validateFundingAgency,
  roleMiddleware,
  fundingAgency.update
);
router.delete("/:id", fundingAgency.delete);
router.get("/:id", fundingAgency.show);
// END

module.exports = router;
