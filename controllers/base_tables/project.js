const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const projectModel = require("../../schema/projects");
const fundingAgencyModel = require("../../schema/fundingAgency");
const heiModel = require("../../schema/hei");
const schemeModel = require("../../schema/schemes");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const projects = await projectModel.find();
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllStates,
        projects
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await projectModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(
          res,
          messages.errorMessages.stateAlreadyExists
        );

      let user = await authUser.getUser(req, res);
      const fa = await fundingAgencyModel.findOne({ admin: user._id });
      const hei = await heiModel.findOne({ heiAdmin: user._id });
      const projects = await projectModel.create({
        ...req.body,
        fundingAgency: fa._id,
        hei: hei._id,
      });

      returnMessage.successMessage(
        res,
        messages.successMessages.addState,
        projects
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const project = await projectModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showState,
        project
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const projects = await projectModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body },
        { new: true }
      );
      returnMessage.successMessage(
        res,
        messages.successMessages.updateState,
        projects
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const project = await projectModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.deleteState,
        project
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const project = await projectModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showState,
        project
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
