const bill = require("../controllers/bill");
const router = require("express").Router();
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", bill.index);
router.post("/", roleMiddleware, bill.create);
router.get("/:id/edit", roleMiddleware, bill.edit);
router.put("/:id", roleMiddleware, bill.update);
router.put("/:id/approve", roleMiddleware, bill.approve);
router.delete("/:id", bill.delete);
router.get("/:id", bill.show);

module.exports = router;
