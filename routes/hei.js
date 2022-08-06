const hei = require("../controllers/hei");

const router = require("express").Router();

router.get("/", hei.index);
router.post("/", hei.create);
router.get("/:id/edit",hei.edit);
router.put("/:id",hei.update);
router.delete("/:id",hei.delete);
router.get("/:id",hei.show);

module.exports = router;