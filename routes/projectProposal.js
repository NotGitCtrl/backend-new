const projectProposalProposal = require("../../controllers/base_tables/projectProposal");
const router = require("express").Router();
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/",roleMiddleware, projectProposal.index);
router.post("/",roleMiddleware, projectProposal.create);
router.get("/:id/edit",roleMiddleware, projectProposal.edit);
router.put("/:id",roleMiddleware, projectProposal.update);
// router.delete("/:id", projectProposal.delete);
router.get("/:id", projectProposal.show);
router.get("/getProjectCoordinators",roleMiddleware,projectProposal.getProjectCoordinators);

module.exports = router;
