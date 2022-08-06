const stream = require("../../controllers/base_tables/stream");

const router = require("express").Router();

router.get("/", stream.index);
router.post("/", stream.create);
router.get("/:id/edit",stream.edit);
router.put("/:id",stream.update);
router.delete("/:id",stream.delete);
router.get("/:id",stream.show);

module.exports = router;
