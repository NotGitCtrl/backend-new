const report = require("../../controllers/base_tables/report");
const router = require("express").Router();
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/:id/list", report.index);
router.post("/", roleMiddleware, report.create);
router.get("/:id/edit", roleMiddleware, report.edit);
router.put("/:id", roleMiddleware, report.update);
router.put("/:id/approve", roleMiddleware, report.approve);
router.delete("/:id", report.delete);
router.get("/:id", report.show);
module.exports = router;
