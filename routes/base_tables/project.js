const project = require("../../controllers/base_tables/project");
const router = require("express").Router();
const roleMiddleware = require("../../middleware/roleMiddleware");

router.get("/",roleMiddleware, project.index);
router.post("/",roleMiddleware, project.create);
router.get("/:id/edit",roleMiddleware, project.edit);
router.put("/:id",roleMiddleware, project.update);
router.post("/:projectId/approve",roleMiddleware, project.approveProject);
router.get("/:id/getProjects", roleMiddleware, project.getProjectsAccToProposal);
// router.delete("/:id", project.delete);
router.get("/:id", project.show);
router.get("/getProjectCoordinators",roleMiddleware,project.getProjectCoordinators);
module.exports = router;
