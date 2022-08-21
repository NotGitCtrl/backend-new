const transaction = require("../../controllers/base_tables/transaction");
const router = require("express").Router();
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/", transaction.index);
router.post("/", roleMiddleware, transaction.create);
router.get("/:id/edit", roleMiddleware, transaction.edit);
router.put("/:id", roleMiddleware, transaction.update);
router.delete("/:id", transaction.delete);
router.get("/:id", transaction.show);

module.exports = router;
