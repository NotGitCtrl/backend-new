const fundingAgency = require("../../controllers/fundingAgency");

const router = require("express").Router();

// START - Super Admin / UGC Routes
router.get("/", fundingAgency.index);
router.post("/", fundingAgency.create);
router.get("/:id/edit",fundingAgency.edit);
router.put("/:id",fundingAgency.update);
router.delete("/:id",fundingAgency.delete);
router.get("/:id",fundingAgency.show);
// END


module.exports = router;
