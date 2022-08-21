const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const spocModel = require("../schema/spoc");
const authUser = require("../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const spocs = await spocModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCountries,
        spocs
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const {name} = req.body;
        const isNameTaken = await spocModel.findOne({name});
        if (isNameTaken)
          returnMessage.errorMessage(
            res,
            messages.errorMessages.countryAlreadyExists
          );

        let user = await authUser.getUser(req, res);
        const spoc = await spocModel.create({
          ...req.body,
          createdBy: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.addCountry,
          spoc
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const spoc = await spocModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showCountry,
          spoc
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        let user = await authUser.getUser(req, res);
        const spoc = await spocModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
          updatedBy: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateCountry,
          spoc
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const spoc = await spocModel.remove({
        _id: req.params["id"],
      });
      returnMessage.successMessage(res, messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const spoc = await spocModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        spoc
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
