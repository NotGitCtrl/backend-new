const stream = require("../../controllers/base_tables/stream");

const router = require("express").Router();

const {
  validateStreams,
  streamValidateRules,
} = require("../../validations/base-tables");
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/", stream.index);
router.post(
  "/",
  streamValidateRules(),
  validateStreams,
  roleMiddleware,
  stream.create
);
router.get("/:id/edit", roleMiddleware, stream.edit);
router.put("/:id", roleMiddleware, stream.update);
router.delete("/:id", stream.delete);
router.get("/:id", stream.show);

module.exports = router;
