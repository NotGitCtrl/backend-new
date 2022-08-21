const spoc = require("../controllers/spoc");
const router = require("express").Router();
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", spoc.index);
router.post("/", roleMiddleware, spoc.create);
router.get("/:id/edit", roleMiddleware, spoc.edit);
router.put("/:id", roleMiddleware, spoc.update);
router.delete("/:id", spoc.delete);
router.get("/:id", spoc.show);

module.exports = router;
