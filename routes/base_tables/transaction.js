const transaction = require("../../controllers/base_tables/transaction");
const router = require("express").Router();

router.get("/", transaction.index);
router.post("/", transaction.create);
router.get("/:id/edit", transaction.edit);
router.put("/:id", transaction.update);
router.delete("/:id", transaction.delete);

module.exports = router;
