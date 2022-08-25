const phaseModel = require("../schema/phases");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const phases = await phaseModel.find({ projectId: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCountries,
        phases
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if ((req.user.role.name == "fa-admin") || (req.user.role.name == "hei-admin") || (req.user.role.name == "project-member")) {
        const phase = await phaseModel.create({ ...req.body });
        returnMessage.successMessage(
          res,
          messages.successMessages.addCountry,
          phase
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const phase = await phaseModel.findOne({ _id: req.params["id"] });
        returnMessage.successMessage(
          res,
          messages.successMessages.showCountry,
          phase
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.user.role.name == "fa-admin") {
        const phase = await phaseModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateCountry,
          phase
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const phase = await phaseModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const phase = await phaseModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        phase
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
